

function onDocumentReady() {
    const titles = document.querySelectorAll(".cmp-title--heading");
    titles.forEach(element => {
        if(element.querySelector(".cmp-title__text")){    
        const h1Element = document.createElement("h1");
        h1Element.style.color = "transparent";
        h1Element.style.position = "absolute";
        h1Element.style.outline = "none";             
        h1Element.id = 'div_id';
        h1Element.style.width = "100%";
        h1Element.innerHTML = element.querySelector(".cmp-title__text").innerHTML;
            const pageBody = document.querySelector(".page");
            pageBody.insertBefore(h1Element, pageBody.childNodes[0]);
            document.getElementById("div_id").focus();
        }
    });
}


if (document.readyState !== "loading") {
    onDocumentReady();
} else {
    document.addEventListener("DOMContentLoaded", onDocumentReady);
}