(function(window, snro) {
    snro = window.snro = snro || {};
    const urlPathName = window.location.pathname;
    const countryCodePath = urlPathName && urlPathName.split('/') && urlPathName.split('/')[1];
    const countryLangPath = urlPathName && urlPathName.split('/') && urlPathName.split('/')[2];


    snro.brevilleSignUp = {
        moduleName: 'brevilleSignUp',

        submitForm() {
            const firstname = document.getElementsByName('Firstname')[0].value;
            const lastname = document.getElementsByName('Lastname')[0].value;
            const email = document.getElementsByName('Email')[0].value;
            const brand = document.getElementsByName('Brand')[0].value;
            const SERVLET_PATH = '/bin/breville/servlets/newsLetterSubscription?email=' + email + '&brand=' + brand + '&region=' + countryCodePath + '&language=' + countryLangPath + '&firstName=' + firstname + '&lastName=' + lastname;

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

    $('.cmp-form-button').on('click', function() {
        snro.brevilleSignUp.submitForm();

    });
	
    //Close buttons for popups
    $('.cmp-container--signup-success button').click(function() {
        $(this).parents('.cmp-container--signup-success').removeClass('shown');
    });
    $('.cmp-container--signup-failure button').click(function() {
        $(this).parents('.cmp-container--signup-failure').removeClass('shown');
    });


})(window, window.snro);