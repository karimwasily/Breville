(function(window, snro) {
    snro = window.snro = snro || {};
    const urlPathName = window.location.pathname;
    //const countryCodePath = urlPathName && urlPathName.split('/') && urlPathName.split('/')[1];
    //const countryLangPath = urlPathName && urlPathName.split('/') && urlPathName.split('/')[2];

    snro.beanzSignUp = {
        moduleName: 'beanzSignUp',

        submitForm() {

            const email = document.getElementsByName('Email')[0].value;
            //const brand = document.getElementsByName('Brand')[0].value;
			const brand = "Beanz"
            const SERVLET_PATH = '/bin/breville/servlets/newsLetterSubscription?email=' + email + '&brand=' + brand + '&region=' + "us" + '&language=' + "en";

            function newFormCallback(flag) {
                if (flag.status === 200) {
                    $('.cmp-container--signup-success').addClass('shown');
                } else {
                    $('.cmp-container--signup-failure').addClass('shown');
                }
            }

            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.status > 0) {
                    newFormCallback(this);
                }
            };
            xhttp.open('GET', SERVLET_PATH, true);
            xhttp.send();
        },

    };
})(window, window.snro);

$('.cmp-form-button').on('click', function() {
    snro.beanzSignUp.submitForm();
});

//Close buttons for popups
$('.cmp-container--signup-success button').click(function() {
    $(this).parents('.cmp-container--signup-success').removeClass('shown');
});
$('.cmp-container--signup-failure button').click(function() {
    $(this).parents('.cmp-container--signup-failure').removeClass('shown');
});