//Custom event that is fired from AEM Dialog
$(document).on("dialog-ready", function () {
    getImageValueImg();
    setReticleLocation();

    const fileUploadElements = document.querySelectorAll('.cq-FileUpload');
    const formFieldElements = document.querySelectorAll('.coral-Form-field');
    const dialogDropdownShowHide = document.querySelectorAll('.cq-dialog-dropdown-showhide');

    fileUploadElements.forEach(elem => elem.addEventListener('change', getImageValueImg));
    formFieldElements.forEach(elem => elem.addEventListener('change', getImageValueImg));
    dialogDropdownShowHide.forEach(elem => elem.addEventListener('change', getImageValueImg));

});

//Get Image source for desktop and mobile 
function getImageValueImg() {
    const elements = document.getElementsByTagName('coral-fileupload');
    Array.from(elements).forEach(element => {
        const imageElement = element.querySelector('.cq-FileUpload-thumbnail-img img');
        const imgSrc = imageElement ? imageElement.src : '';

        if (imgSrc && imgSrc != '') {
            if (element.getAttribute('name').includes('fileDesktop')) {
                setImageValue(imgSrc, '.focusPointDesktop');
            }

            if (element.getAttribute('name').includes('fileMobile')) {
                setImageValue(imgSrc, '.focusPointMobile');
            }

            else {
                setImageValue(imgSrc, '.focuspoint-helper-tool');
            }
        }
    });
}

// convert the button coordinates into left and top percentages
function setReticleLocation() {
    let cords = document.querySelectorAll('.helper-tool-data-attr-coords');

    cords.forEach(element => {
        const parentNode = element.parentNode;
        const cord = element.getAttribute('value');
        let reticle = parentNode.querySelector('.reticle');

        if (cord) {
            reticle.style.left = cord.split(':')[0] + '%';
            reticle.style.top = cord.split(':')[1] + '%';
        }
    })
}

// Set the position of button on click
function setButton(targetImage, parentNode) {
    targetImage.addEventListener("click", function (e) {

        let pointerData = parentNode.querySelector('.helper-tool-data-attr-coords');
        let pointer = parentNode.querySelector('.reticle');

        let imageW = targetImage.clientWidth;
        let imageH = targetImage.clientHeight;

        let offsetX = e.pageX - targetImage.getBoundingClientRect().left;
        let offsetY = e.pageY - targetImage.getBoundingClientRect().top;

        let percentageX = Math.abs((offsetX / imageW) * 100);
        let percentageY = Math.abs((offsetY / imageH) * 100);

        pointerData.setAttribute('value', percentageX.toFixed(2) + ':' + percentageY.toFixed(2));
        pointer.style.top = percentageY + '%';
        pointer.style.left = percentageX + '%';
    });
}

// Set the image and button
function setImageValue(imgPath, query) {
    const focusPoint = document.querySelectorAll(query);

    focusPoint.forEach(element => {
        let targetImage = element.querySelector('.target-overlay');
        let helperImage = element.querySelector('.helper-tool-img');
        targetImage.src = imgPath;
        helperImage.src = imgPath;
        setButton(targetImage, element);
        setButton(helperImage, element);
    })
}
