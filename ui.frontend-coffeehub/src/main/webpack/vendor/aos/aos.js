import AOS from 'aos';
//below listed default settings

function onElementHeightChange(elm, callback) {
    var lastHeight = elm.clientHeight;
    var newHeight;

    (function run() {
        newHeight = elm.clientHeight;
        if (lastHeight !== newHeight) {
            callback();
        }
        lastHeight = newHeight;

        if (elm.onElementHeightChangeTimer) {
            clearTimeout(elm.onElementHeightChangeTimer);
        }

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}

function isMobileMode() {
    return ($(window).outerWidth() <= 768);
}

$(function () {

    const initObj = {
        duration: 800,
        once: true
    };
    AOS.init(initObj);
    if (isMobileMode()) {
        $('.aos-init').attr('data-aos-anchor-placement', 'top-bottom');
    }

    onElementHeightChange(document.body, function () {
        AOS.refresh();
    });
});
