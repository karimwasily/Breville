import simpleParallax from 'simple-parallax-js';
//below listed default settings

const imageRight = document.querySelectorAll('.cmp-container--float-right img');
const imageLeft = document.querySelectorAll('.cmp-container--float-left img');

function onDocumentReady() {
    new simpleParallax(imageRight, {
    delay: 0,
    orientation: 'left',
    scale: 1.45,
    maxTransition: 50,
    transition: 'cubic-bezier(.17,.67,.83,.67)'
  });
    new simpleParallax(imageLeft, {
    delay: 0,
    orientation: 'right',
    scale: 1.45,
    maxTransition: 50,
    transition: 'cubic-bezier(.17,.67,.83,.67)'
  });
};

if (document.readyState !== "loading") {
  onDocumentReady();
} else {
  document.addEventListener("DOMContentLoaded", onDocumentReady);
}

