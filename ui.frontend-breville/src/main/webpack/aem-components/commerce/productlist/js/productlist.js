/*  This javascript code will responsible for PLP filter.*/

/* eslint no-console: 0 */
/*
 * productList.js
 * @project:    Rewrite Brands
 * @date:       2021-03-16
 * @author:
 * @licensor:   Mahesh
 * @namespaces: snro
 */

//this will cause the browser to check for errors more aggressively

function init() {
    const element = document.querySelector(".productlistbreville .gallery__root .plp__navigation .gallery__sort");
    const containerElement = document.querySelector(".productlistbreville .gallery__root .plp__navigation .sort-gallery");
    const readElement = document.querySelector(".productlistbreville .read-more-area");
    const readMoreElement = document.querySelector(".productlistbreville .read-more-btn");

    if (element && containerElement) {
        element.addEventListener('click', event => {
            containerElement.classList.toggle('hidden');
            element.classList.toggle('activeMenu');
        });
    }

    if (readElement && readMoreElement) {
        readMoreElement.addEventListener('click', event => {
            readElement.classList.toggle('hidden');
            readMoreElement.classList.toggle('activeMenu');
        });
    }
}

document.addEventListener("DOMContentLoaded", init);