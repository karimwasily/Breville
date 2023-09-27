function onDocumentReady() {

    const QUERY = {
        PARALLAX_SCROLL : ".cmp-parallax-scroll",
        PARALLAX_CONTENT : ".cmp-parallax-scroll__content",
        IMAGE : ".cmp-parallax-scroll__background-image",
    };

    const parallaxComponents = document.querySelectorAll(QUERY.PARALLAX_SCROLL);
    parallaxComponents.forEach(parallaxComponent => {

        //Set wrapper height base on image
        function setWrapperHeight(image) {
            let imageHeight = 0;
            if(image) {
                imageHeight = image.clientHeight;
                let wrapperHeight = imageHeight + parseInt(image.parentNode.dataset.background);
                if(image.dataset.configuration === 'increase') {
                    wrapperHeight = wrapperHeight - (imageHeight * image.dataset.scroll / 100);
                }
                image.parentNode.style.minHeight = wrapperHeight + 'px';
            }            
        }

        //Set image position with scroll speed
        function onScrollSetPosition(image) {
            const elementTop = image.getBoundingClientRect().top;
            const scrollType = image.dataset.configuration === "increase" ? 1 : -1;
            const pixel = (elementTop * scrollType / (100 / image.dataset.scroll));
            if(window.scrollY ===  0) {
                image.style.transform = 'translateY(0px)';
            }
            if((image.dataset.configuration === 'increase' && pixel < 0) 
                || image.dataset.configuration === 'decrease') {
                image.style.transform = 'translateY(' + pixel + 'px)';                
            }
        }

        //Init function
        function setImageSpeed(component) {
            if(component) {
                const images = component.querySelectorAll(QUERY.IMAGE);
                let largestImage;
                let largestImageHeight = 0;
                
                if(images) {
                    images.forEach(image => {
                        onScrollSetPosition(image);
                        window.addEventListener('scroll', function() {onScrollSetPosition(image);}, {passive: true});
                        
                        if(largestImageHeight < image.clientHeight) {
                            largestImageHeight = image.clientHeight;
                            largestImage = image;
                        }
                    });

                    //Calculate wrapper height when window scroll
                    window.addEventListener('scroll', function() {
                        setWrapperHeight(largestImage);
                    });
                    //Calculate wrapper height when window resize
                    window.addEventListener('resize', function() {
                        if(!document.cookie.includes('wcmmode=edit') 
                            && !document.cookie.includes('wcmmode=design') 
                            && !document.cookie.includes('wcmmode=preview')) {  
                            setWrapperHeight(largestImage);
                        }
                    });
                }
                setWrapperHeight(largestImage);
            }
            
        }

        setImageSpeed(parallaxComponent);
    });
}

if (document.readyState !== "loading") {
    onDocumentReady();
} else {
    document.addEventListener("DOMContentLoaded", onDocumentReady);
}
