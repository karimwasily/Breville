import request from 'api/request';
import Handlebars from 'handlebars';
import { event } from 'jquery';
import userSchema from 'library/schema/users';
import { analyticsData } from 'xps-utils/analytics';
import { configuration } from 'xps-utils/configuration';
const configurationData = configuration();
/** @type {import('jquery')} $ */

let subscriptionvalue = '';
let quantityofbags = '';
let grindvalue = '';
let flavourvalue = '';
let flavourTemplate, brewMethod;
let Requestcomplete = false;
let skuSubscriptionplan = '';
let productquantity = 0;
let mainskucode = '';
const analytics = analyticsData();

const _cache = {};
_cache.pdpModule = $('.beanzproducts');
_cache.changeCoffeeModal = $('.change-coffee-popup');
let bagSize;

const mystery = _cache.pdpModule.find('.productFullDetail__root').data('discoverysku');
const quantitytext = _cache.pdpModule.find('.productFullDetail__root').data('quantitytext');
const flavourtext = _cache.pdpModule.find('.productFullDetail__root').data('flavourtext');
const frequencytext = _cache.pdpModule.find('.productFullDetail__root').data('frequencytext');
const weighttext = _cache.pdpModule.find('.productFullDetail__root').data('weighttext');
const grindtext = _cache.pdpModule.find('.productFullDetail__root').data('grindtext');
const methodtext = _cache.pdpModule.find('.productFullDetail__root').data('methodtext');
function checkPriceAndAvailability(sku) {
    const webStatus = _cache.pdpModule.find('.productFullDetail__root').data('webstatus');
    if (webStatus === 'Visible for Sale') {
        _cache.pdpModule.find('.productFullDetail__emptyInventory').addClass('hidden');
        let pajsondata = request.post('CheckPriceAndAvailability', {
            variables: { "where": "masterData(current(masterVariant(sku in (\"" + sku + "\")))) or masterData(current(variants(sku in (\"" + sku + "\"))))", "country": "US", "currency": "USD", includeChannelIds: configurationData.supplyChannelId }
        })
        pajsondata.then((result) => {
            try {
                let productcount = result.data.products.total;
                if (productcount === 0) {
                    $('.button__root_highPriority.button__root.clickable__root.button__filled').hide();
                    $('.productFullDetail__cartActions').addClass('hidden');
                    $('.productFullDetail__root .outofStockInventory').removeClass('hidden');
                    return;
                } else {
                    $('.button__root_highPriority.button__root.clickable__root.button__filled').show();
                    $('.productFullDetail__cartActions').removeClass('hidden');
                    $('.productFullDetail__root .outofStockInventory').addClass('hidden');
                }

                let isPublished = result.data.products.results[0].masterData.published;
                let availabilityonStock = result.data.products.results[0].masterData.current.masterVariant.availability.
                    channels.results[0].availability.isOnStock;

                if (!(isPublished && availabilityonStock)) {
                    $('.button__root_highPriority.button__root.clickable__root.button__filled').hide();
                    $('.productFullDetail__cartActions').hide();
                }
            }
            catch (err) {
            }
        })
            .catch((error) => console.log('error', error));
    } else if (webStatus === 'Visible but not for Sale' || webStatus === 'Legacy') {
        _cache.pdpModule.find('.productFullDetail__options, .productFullDetail__price, .priceinfo').addClass('hidden');
        _cache.pdpModule.find('.productFullDetail__cartActions').addClass('hidden');
        _cache.pdpModule.find('.unavailable').removeClass('hidden');
    } else if (webStatus === 'Out of Stock') {
        _cache.pdpModule.find('.productFullDetail__options, .productFullDetail__price, .priceinfo').addClass('hidden');
        _cache.pdpModule.find('.productFullDetail__cartActions').addClass('hidden');
        _cache.pdpModule.find('.outOfStock').removeClass('hidden');
    } else {
        _cache.pdpModule.addClass('hidden');
        document.querySelector(".pageNotFound").classList.remove('hidden');
    }
};


// Select Dropdown
$('.productFullDetail__root .drop-down .options ul li .selectedOption').each(function () {
    if ($(this).hasClass('tile__root_selected')) {
        const spanText = $(this).html();
        $(this).parents('.drop-down').find('.selected .selectedOption span').html(spanText);
    }
});

// Dropdown button click function
$(document).on('click', '.productFullDetail__root .drop-down .selected .selectedOption', function () {
    $('.productFullDetail__root .collapse-dropdown .options ul').hide();
    $(this).parents('.collapse-dropdown').find('.options ul').show();
    $(this).parents('.drop-down').addClass('show-dropdown');
});

// Selecting active item
$(document).on('click', '.beanzproducts .drop-down .options ul li', function () {
    const dataID = $(this).parent().closest('.tileList__root').data('id');
    const subscriptionID = $(this).data('subscriptionname');
    let selectedID;
    if (dataID === 'web_subscription') {
        selectedID = parseInt(_cache.pdpModule.find('.tileList__root[data-id="web_sendme"] ul li.tile__root_selected').html());
        if ($(this).data('frequency').includes('PLAN')) {
            if (selectedID === 1) {
                selectedID = 2;
                _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] ul li:first-child').removeClass('tile__root_selected').addClass('hidden');
                _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] ul li:nth-child(2)').addClass('tile__root_selected');
                _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] .selectedOption .defaultvalue').html(`${selectedID} x ${bagSize}`);
            } else {
                _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] ul li:first-child').addClass('hidden').removeClass('tile__root_selected');
            }
        } else {
            _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] ul li:first-child').removeClass('hidden tile__root_selected');
        }
    }
    const text = $(this).html();
    $(this).parents('.drop-down').find('.selected .selectedOption span').html(text);
    $(this).parents('.collapse-dropdown').find('ul').hide();
    $('.productFullDetail__root .drop-down').removeClass('show-dropdown');
    $(this).parents('.drop-down').find('.selectedOption').removeClass('tile__root_selected');
    $(this).addClass('tile__root_selected');
});

/*$(document).on('click', '.beanzproducts .productFullDetail__root #flavour ul li', function (e) {
    e.preventDefault();
    if ($(this).hasClass('tile__root_selected')) {
        $(this).removeClass('tile__root_selected');
    } else {
        $(this).addClass('tile__root_selected');
    }
});*/
// Close dropdwn on click outside
$(document).mouseup(function (e) {
    const dropDown = $('.productFullDetail__root .collapse-dropdown');
    if (!$('.productFullDetail__root .collapse-dropdown .options ul').is(e.target) && !dropDown.is(e.target) && dropDown.has(e.target).length == 0) {
        $('.productFullDetail__root .collapse-dropdown .options ul').hide();
        dropDown.removeClass('show-dropdown');
    }
});

// Keyboard events
$(document).on('keydown', '.drop-down', function (event) {
    let focused_option = $($(this).find('.selectedOption:focus')[0] || $(this).find('.selectedOption.tile__root_selected')[0]);
    // Space or Enter
    if (event.keyCode == 32 || event.keyCode == 13) {
        $(this).addClass('show-dropdown');
        focused_option.focus();
        if ($(this).hasClass('show-dropdown')) {
            focused_option.trigger('click');
        } else {
            $(this).trigger('click');
        }
        return false;
        // Down
    } else if (event.keyCode == 40) {
        if (!$(this).hasClass('show-dropdown')) {
            $(this).trigger('click');
        } else {
            focused_option.next().focus();
        }
        return false;
        // Up
    } else if (event.keyCode == 38) {
        if (!$(this).hasClass('show-dropdown')) {
            $(this).trigger('click');
        } else {
            let focused_option = $($(this).find('.selectedOption:focus')[0] || $(this).find('.selectedOption.tile__root_selected')[0]);
            focused_option.prev().focus();
        }
        return false;
    } 
});

// Order Help Modal popup
function openPopupModal(className) {
    const mpopup = $('#BeanzOrderHelp');
    mpopup.find(className).addClass('shown');
    $('body').addClass('modal-open');
    mpopup.find('.cmp-btn--order-help-close').on('click', function () {
        mpopup.find(className).removeClass('shown');
        $('body').removeClass('modal-open');
    });

    // Close popup on enter Esc key
    $(document).on('keyup', function (event) {
        if (event.which == 27) { // esc
            $(className).removeClass('shown');
            $('body').removeClass('modal-open');
        }
    });

    // Close popup on click outside
    $(document).mouseup(function (e) {
        const popupBox = $(className + ' .cmp-container');
        if (!popupBox.is(e.target) && popupBox.has(e.target).length == 0) {
            $(className).removeClass('shown');
            $('body').removeClass('modal-open');
        }
    });
}

$(document).on('click', '.beanzproducts .productFullDetail__root .input-info-secondary', function () {
    if ($(this).attr('class').includes('discovery')) {
        openPopupModal(".cmp-container--order-help-discovery");
    } else {
        openPopupModal(".cmp-container--order-help");
    }
});

// CT PDP Data
let customData = _cache.pdpModule.find('#subscriptionData').html();
let resultData;
if (customData) {
    customData = JSON.parse(customData);
    resultData = customData.data.customObjects.results;
}

function displayMessage(selectedPlanID) {
    if (selectedPlanID) {
        if (resultData && resultData.length >= 1) {
            if (selectedPlanID.includes('PLAN')) {
                for (let i = 0; i < resultData.length; i++) {
                    if (resultData[i].value.planId === selectedPlanID) {
                        $('.subscriptionTemplate p.input-info').html(resultData[i].value.description.en);
                    }
                }
            } else {
                $('.subscriptionTemplate p.input-info').html('Subscribe & enjoy Free Shipping. Minimum of 2 bags per delivery applies.');
            }
        }
    }
}

let data, subscriptionData, flavourData, quantityData, bagsizeData, grindData, displayNumber, displayName, jsonData, discoveryData, frequency, subscriptionName, mysteryData;
let skuDataArr = [];

function quantityDropDown(bagSize, type, change) {
    const source = _cache.pdpModule.find('#quantityTemplate').html();
    const quantityArr = ['1', '2', '3', '4', '5'];
    const quantityDisplay = [];
    if (source) {
        quantityData = Handlebars.compile(source);
    }
    for (let i = 0; i < quantityArr.length; i++) {
        if (i == 0) {
            quantityDisplay.push(quantityArr[i] + ' Bag');
        } else {
            quantityDisplay.push(quantityArr[i] + ' Bags');
        }
    }
    return quantityDisplay;
}

function bagsizeDropdown(bagSize, type, change, productPrice, currencyCode) {
    const source = _cache.pdpModule.find('#bagcountTemplate').html();
    if (source) {
        bagsizeData = Handlebars.compile(source);
    }
    const bagcountDisplay = [];
    if (type == 'pdp') {
        bagcountDisplay.push(bagSize + " " + currencyCode + productPrice)
    }
    return bagcountDisplay;
}

function displaySubscriptionPlan(skuData) {
    skuDataArr = [];
    if (skuData && skuData.length >= 1) {
        for (let i = 0; i < skuData.length; i++) {
            frequency = skuData[i];
            if (!skuData[i].includes('_PLAN_')) {
                mainskucode = skuData[i].replace(/\s/g, '');
                if(mystery == false){
                    checkPriceAndAvailability(mainskucode);
                }
            }
            if (skuData[i].includes('_PLAN_')) {
                subscriptionName = skuData[i].substring(skuData[i].indexOf('_')).substring(1);
                displayName = displaySubscriptionName(subscriptionName);
            } else {
                if (!skuData[i].includes('DISCOVERY')) {
                    subscriptionName = 'Just_one_time';
                    displayName = 'Just one time';
                }
            }
            if (displayName) {
                const obj = {
                    subscriptionName: subscriptionName,
                    frequency: frequency,
                    displayNumber: displayNumber,
                    displayName: displayName
                };
                skuDataArr.push(obj);
            }
        }
    }
}

function subScriptionDropDown(data, type, change) {
    if (data) {
        const source = _cache.pdpModule.find('#subscriptionTemplate').html();
        if (source) {
            subscriptionData = Handlebars.compile(source);
        }
        if (type === 'pdp') {
            const skuData = data.data.products.results[0].skus;
            displaySubscriptionPlan(skuData);
        } else {
            if (change === 'change') {
                displaySubscriptionPlan(data);
            } else {
                displaySubscriptionPlan(data[0].PLAN_ID);
            }
        }
        return skuDataArr;
    }
}

function flavourDropDown(data, type, change) {
    let flavour;
    if (data) {
        const source = _cache.pdpModule.find('#flavourTemplate').html();
        if (source) {
            flavourData = Handlebars.compile(source);
        }
        if (type === 'discovery' && change === 'change') {
            flavour = JSON.parse(data);
        }else{
            flavour = JSON.parse(data[0].key);
        }
        return flavour;
    }
}

function displaySubscriptionName(subscriptionName) {
    if (subscriptionName.includes('WEEK')) {
        displayNumber = subscriptionName.replace(/^\D+/g, '');
        if (displayNumber === '1') {
            displayName = ' Week';
        } else {
            displayName = ' Weeks';
        }
    } else if (subscriptionName.includes('MONTH')) {
        displayNumber = subscriptionName.replace(/^\D+/g, '');
        if (displayNumber === '1') {
            displayName = ' Month';
        } else {
            displayName = ' Months';
        }
    } else {
        // else
    }
    return displayName;
}

function grindDropDown(jsonData, type, change) {
    const source = _cache.pdpModule.find('#grindTemplate').html();
    let attributesRaw, grind = [];
    if (source) {
        grindData = Handlebars.compile(source);
    }
    if (type === 'pdp') {
        attributesRaw = jsonData.masterVariant.attributesRaw;
        if (attributesRaw && attributesRaw.length >= 1) {
            for (let i = 0; i < attributesRaw.length; i++) {
                if (attributesRaw[i].name === 'WEB_GRIND') {
                    grind = JSON.parse(Object.values(attributesRaw[i].value)[0]);
                }
            }
        }
    } else {
        if (jsonData) {
            if (change === 'change') {
                grind = JSON.parse(jsonData);
            } else {
                grind = JSON.parse(jsonData[0].WEB_GRIND);
            }
        }
    }
    return grind;
}

//Discovery
const currencyCode = _cache.pdpModule.find('.productFullDetail__root').data('currencysymbol');
if (mystery === false) {
    data = _cache.pdpModule.find('#pdpData').html();
    if (data) {
        data = JSON.parse(data);
        jsonData = data.data.products.results[0].masterData.current;
        const productPrice = (jsonData.masterVariant.prices[0]['value'].centAmount / 100).toFixed(2);
        bagSize = _cache.pdpModule.find('.bagSize').html();

        _cache.pdpModule.find('.productFullDetail__price span').html(`${currencyCode}${productPrice}`);

        const subscription = subScriptionDropDown(data, 'pdp', ''); // Every
        _cache.pdpModule.find('.productFullDetail__options').append(subscriptionData(subscription));

        const bagcount = bagsizeDropdown(bagSize, 'pdp', '', productPrice, currencyCode); // weight
        _cache.pdpModule.find('#subscription').after(bagsizeData(bagcount));

        const quantity = quantityDropDown(bagSize, 'pdp', ''); // quantity
        _cache.pdpModule.find('#bagcount').after(quantityData(quantity));

        const grind = grindDropDown(jsonData, 'pdp'); // Grind
        _cache.pdpModule.find('#quantity').after(grindData(grind));
    }
} else {
    if (_cache.pdpModule.find('#discoveryData').html()) {
        mysteryData = JSON.parse(_cache.pdpModule.find('#discoveryData').html());

        let discoveryArr = [], grindArr = [], subscriptionArr = [], quantityArray = [], flavourArr = [];
        function discoveryDropDown() {
            const source = _cache.pdpModule.find('#discoveryTemplate').html();
            if (source) {
                discoveryData = Handlebars.compile(source);
            }
            for (let key in mysteryData) {
                const disObj = {
                    "key": mysteryData[key].WEB_MACHINE_TYPE,
                    "frequency": key
                }
                discoveryArr.push(disObj);

                const flavourObj = {
                    "key": mysteryData[key].WEB_FLAVOURCATEGORY,
                    "frequency": key
                }
                flavourArr.push(flavourObj);

                const obj = {
                    "WEB_MACHINE_TYPE": mysteryData[key].WEB_MACHINE_TYPE,
                    "WEB_GRIND": mysteryData[key].WEB_GRIND,
                    "PLAN_ID": mysteryData[key].PLAN_ID,
                    "price": mysteryData[key].price,
                    "WEB_BAGSIZE": mysteryData[key].WEB_BAGSIZE
                }
                grindArr.push(obj);
                subscriptionArr.push(obj);
                quantityArray.push(obj);
            }
            return discoveryArr;
        }

        const discovery = discoveryDropDown(); // Discovery
        _cache.pdpModule.find('.productFullDetail__options').append(discoveryData(discovery));

        const flavour = flavourDropDown(flavourArr, 'discovery', ''); // Flavour
        if (flavour) {
            _cache.pdpModule.find('#discovery').before(flavourData(flavour));
        }

        const subscription = subScriptionDropDown(subscriptionArr, 'discovery', ''); // Every
        if (subscription) {
            _cache.pdpModule.find('#discovery').after(subscriptionData(subscription));
            _cache.pdpModule.find('#subscription .cmp-info--order-help-btn').addClass('hidden');
        }

        const grind = grindDropDown(grindArr, 'discovery'); // Grind
        if (grind) {
            _cache.pdpModule.find('#subscription').after(grindData(grind));
        }

        const quantity = quantityDropDown(quantityArray, 'discovery', ''); // Send me
        if (quantity) {
            _cache.pdpModule.find('#subscription').after(quantityData(quantity));
            _cache.pdpModule.find('#quantity').addClass('noInputInfo');
            _cache.pdpModule.find('#quantity .input-info').addClass('hidden');
        }
        const productPrice = grindArr[0].price;
        _cache.pdpModule.find('.productFullDetail__price span').html(`${currencyCode}${productPrice}`);
    }
}

$(document).on('click', '.beanzproducts .productFullDetail__root #discovery ul li', function (e) {
    e.preventDefault();
    const selText = $(this).data('frequency');
    for (let key in mysteryData) {
        if (key === selText) {
            //subscription
            /*const changeSubscription = subScriptionDropDown(mysteryData[key].PLAN_ID, 'discovery', 'change');
            _cache.pdpModule.find('#subscription').remove();
            _cache.pdpModule.find('#discovery').after(subscriptionData(changeSubscription));
            _cache.pdpModule.find('.tileList__root[data-id="web_subscription"] ul li:first-child').addClass('hidden');
            _cache.pdpModule.find('.tileList__root[data-id="web_subscription"] ul li:nth-child(2)').addClass('tile__root_selected');
            const selectedDiscovery = _cache.pdpModule.find('.tileList__root[data-id="web_subscription"] ul li.tile__root_selected').html();
            const selectedPlanID = _cache.pdpModule.find('.tileList__root[data-id="web_subscription"] ul li.tile__root_selected').data('subscriptionname');
            _cache.pdpModule.find('.tileList__root[data-id="web_subscription"] .selected .defaultvalue').html(selectedDiscovery);

            //flavours
            const changeFlavour = flavourDropDown(mysteryData[key].WEB_FLAVOURCATEGORY, 'discovery', 'change');
            _cache.pdpModule.find('#flavour').remove();
            _cache.pdpModule.find('#discovery').before(flavourData(changeFlavour));
            _cache.pdpModule.find('.tileList__root[data-id="web_flavour"] ul li:first-child').addClass('tile__root_selected');

            //quantity
            const quantity = quantityDropDown(mysteryData[key].WEB_BAGSIZE, 'discovery', 'change');
            _cache.pdpModule.find('#quantity').remove();
            _cache.pdpModule.find('#subscription').after(quantityData(quantity));
            _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] ul li:first-child').addClass('hidden');
            _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] ul li:nth-child(2)').addClass('tile__root_selected');
            const selectedQuantity = _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] ul li.tile__root_selected').html();
            _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] .selected .defaultvalue').html(selectedQuantity);
            _cache.pdpModule.find('#quantity').addClass('noInputInfo');
            _cache.pdpModule.find('#quantity .input-info, #subscription .cmp-info--order-help-btn').addClass('hidden');*/

            //Grind
            const grind = grindDropDown(mysteryData[key].WEB_GRIND, 'discovery', 'change');
            _cache.pdpModule.find('#grind').remove();
            _cache.pdpModule.find('#quantity').after(grindData(grind));
            _cache.pdpModule.find('.tileList__root[data-id="web_grind"] ul li:first-child').addClass('tile__root_selected');
            const selectedGrind = _cache.pdpModule.find('.tileList__root[data-id="web_grind"] ul li.tile__root_selected').html();
            _cache.pdpModule.find('.tileList__root[data-id="web_grind"] .selected .defaultvalue').html(selectedGrind);

            //Price
            const productPrice = mysteryData[key].price;
            _cache.pdpModule.find('.productFullDetail__price span').html(`${currencyCode}${productPrice}`);

        }
    }
});

function populatePopup() {
    skuSubscriptionplan = $('.frequency.selectedOption.tile__root_selected').attr('data-frequency');
    let imagesource = $('.carousel__currentImage').attr('src');
    $('.add-to-cart-popup-content--image').attr('src', imagesource);
    subscriptionvalue = $('.subscriptionTemplate .tile__root_selected').text();
    $('#popupsubscriptionfrequency').html('').append(subscriptionvalue.trim());
    subscriptionvalue = subscriptionvalue.replace(/\s/g, '');

    quantityofbags = $('.quantityTemplate .tile__root_selected').text();
    $('#popupbags').html('').append(`${quantityofbags.trim()}`);
    quantityofbags = quantityofbags.replace(/\s/g, ''); 

    grindvalue = $('#grindvalue').text() || 'grind';
    $('#popupgrind').html('').append(grindvalue.trim());
    grindvalue = grindvalue.replace(/\s/g, '');

    let bagsize = $('.bagcountTemplate .tile__root_selected').text();
    $('#popupbagsize').html('').append(bagsize.trim());

    let ProductTagline = $('.cmp-producttile__title').text();
    $('.add-to-cart-popup-content--title').html('').append(`<h2>  ${ProductTagline}</h2>`);

    if($('.flavourTemplate .tile__root_selected').text()){
        flavourTemplate = $('.flavourTemplate .tile__root_selected').text().trim();
    }
    if($('.discoveryTemplate .tile__root_selected').text()){
        brewMethod = $('.discoveryTemplate .tile__root_selected').text().trim();
    }
}

function UpdateCartbyID(cartID, cartversion) {
    quantityofbags = quantityofbags.split('x');
    quantityofbags = parseInt(quantityofbags[0]);
    request.post('UpdateCart', {
        variables:
        {
            id: cartID, version: cartversion, locale: 'en',
            actions: {
                addLineItem: {
                    sku: skuSubscriptionplan, quantity: quantityofbags,
                    custom: {
                        type: { id: configurationData.grindId },
                        fields: [
                            { name: 'Grind', value: `"${grindvalue}"` },
                            { name: 'Flavour_Notes', value: `"${flavourTemplate}"` },
                            { name: 'Brewing_Method', value: `"${brewMethod}"` }
                        ]
                    }, supplyChannel: { typeId: 'channel', id: configurationData.supplyChannelId },
                       distributionChannel: { typeId: 'channel', id: configurationData.supplyChannelId }
                }
            }
        }
    }).then((res) => {

        if (res.data.updateMyCart) {
            cartID = res.data.updateMyCart.id;
            cartversion = res.data.updateMyCart.version;
            localStorage.setItem('cartID', cartID);
            localStorage.setItem('cartversion', cartversion);
            localStorage.setItem('cartUpdated', true);
            _cache.pdpModule.find('.loadingSpinner').addClass('hidden');
            _cache.pdpModule.find('.button__root_highPriority').removeClass('disabled');
            if (localStorage.getItem('cartQuantity')) {
                productquantity = parseInt(localStorage.getItem('cartQuantity'));
                productquantity = productquantity + 1;
                localStorage.setItem('cartQuantity', productquantity);
            }
            $('.cmp-button--cart .cmp-button__text').html(productquantity);
            $('#id-add-to-cart-popup').addClass('shown add-to-cart-popup');
            $('body').addClass('modal-open');
        }
    }).catch((error) => console.log('error', error));;
}

function updateAnalyticsData(subType, navSubComponent) {
    let product = window.digitalData.products.find(prod => prod.productID === _cache.pdpModule.find('.productFullDetail__root').data('sku'));
    let basicEventObj = { target: analytics.constVal.PRODUCT, subType: subType, navComponent: analytics.constVal.PRODUCT, navSubComponent: navSubComponent, product: product };
    analytics.updateAnalytics({ trackMsg: analytics.constVal.ECOMM_CLICK_RULE }, basicEventObj);
}

$('.productFullDetail__cartActions button').on('click', function () {
    _cache.pdpModule.find('.loadingSpinner').removeClass('hidden');
    _cache.pdpModule.find('.button__root_highPriority').addClass('disabled');
    if(mystery == false){
        checkPriceAndAvailability(mainskucode);
    }
    updateAnalyticsData(analytics.constVal.BUTTON, analytics.constVal.ADD_TO_CART);
    populatePopup();
    let cartID = '';
    let cartversion = '';
    if (localStorage.getItem('cartID') === null || localStorage.getItem('cartID') === '') {
        request.post('createEmptyCart', {
            variables:
                userSchema.CreateEmptyCartVariables
        }).then((res) => {
            cartID = res.data.createMyCart.id;
            cartversion = res.data.createMyCart.version;
            localStorage.setItem('cartID', cartID);
            localStorage.setItem('cartversion', cartversion);
            UpdateCartbyID(cartID, cartversion);
            Requestcomplete = true;
        });
    }
    else {
        cartID = localStorage.getItem('cartID');
        cartversion = parseInt(localStorage.getItem('cartversion'));
        UpdateCartbyID(cartID, cartversion);
    }
});

$('.productFullDetail__selectCoffee button').on('click', function () {
    if(mystery == false){
        checkPriceAndAvailability(mainskucode);
    }
    let imagesource = $('.carousel__currentImage').attr('src');
    $('.add-to-cart-popup-content--image').attr('src', imagesource);
    let ProductTagline = $('.cmp-producttile__title').text();
    $('#coffee-selection-productName').html('').append(ProductTagline.trim());
    grindvalue = $('#grindvalue').text() || 'grind';
    $('.popupgrind').html('').append(grindvalue.trim()); 
    quantityofbags = $('.quantityTemplate .tile__root_selected').text();
    let bagquantity = quantityofbags.trim();
    let bagsize = _cache.pdpModule.find('.bagSize').html();
    $('.popupbags').html('').append(bagquantity);

    flavourvalue = $('.flavourTemplate .tile__root_selected').text();
    flavourvalue = flavourvalue.replace(/\s+/g, ' & ').trim();
    flavourvalue = flavourvalue.substring(2, flavourvalue.length-1);
    $('.flavourNote').html(flavourvalue);

    let productprice = $('.productprice').text();
    $('.popupquantity').html('').append(bagsize + " (" + productprice + ")");
    subscriptionvalue = $('.subscriptionTemplate .tile__root_selected').text();
    $('.popupsubscriptionfrequency').html('').append(subscriptionvalue.trim());
    let discoverymethod = $('.discoveryTemplate .tile__root_selected').text();
    $('.popupmethod').html('').append(discoverymethod.trim());
    coffeeSelectionPopup();
});

$('#id-coffee-selection-popup .add-to-cart-popup--footer button').on('click', function () {
    _cache.changeCoffeeModal.find('.loadingSpinner').removeClass('hidden');
    _cache.changeCoffeeModal.find('.change-coffee-select').addClass('disabled');
    let grind = $('#grindvalue').text().trim();
    let quantity = $('.quantityTemplate .tile__root_selected').text().trim();
    quantity = parseInt(quantity.substring(0, 1));
    let standingorderid = localStorage.getItem('standingorderid');
    let sku = $('.subscriptionTemplate .tile__root_selected').attr('data-frequency');
    let new_plan_id = $('.subscriptionTemplate .tile__root_selected').attr('data-subscriptionname');
    
    request.post('changeCoffee', {
        data: {
            "standing_order_id": standingorderid,
            "new_plan_id": new_plan_id,
            "quantity": quantity,
            "grind": grind,
            "sku": sku
        }
    }).then((res) => {
        _cache.changeCoffeeModal.find('.loadingSpinner').addClass('hidden');
        _cache.changeCoffeeModal.find('.change-coffee-select').removeClass('disabled');
        const subscriptionPath = _cache.pdpModule.find('.productFullDetail__root').data('subscriptionpath');
        $(location).prop('href', subscriptionPath);
    });
})

function coffeeSelectionPopup() {
    $('#id-coffee-selection-popup').addClass('shown');
    $('body').addClass('modal-open');
}

$('#add-to-cart-popup-close').on('click', function () {
    $('#id-add-to-cart-popup').removeClass('shown');
    $('body').removeClass('modal-open');
});
$('.add-to-coffee-selection-popup-close').on('click', function () {
    $('#id-coffee-selection-popup').removeClass('shown');
    $('body').removeClass('modal-open');
})

$('#KS-btn-primary-faded').on('click', function () {
    $('#id-add-to-cart-popup').removeClass('shown');
    $('body').removeClass('modal-open');
});

$(document).on('click', function (e) {
    if ($(e.target).closest(".add-to-cart-popup--container").length === 0) {
        $('#id-add-to-cart-popup').removeClass('shown');
        $('body').removeClass('modal-open');
    }
});

$(document).on('keydown', function (e) {
    if (e.keyCode === 27) {
        $('#id-add-to-cart-popup').removeClass('shown');
        $('body').removeClass('modal-open');
    }
});

$('#c-GoToCart').on('click', function () {
    request.post('GoToCartService', {
        variables:
            userSchema.GoToCartVariables
    }).then((res) => {
        const cartPath = _cache.pdpModule.find('.productFullDetail__root').data('cartpagepath');
        window.location.href(cartPath);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cartQuantity') === '' || localStorage.getItem('cartQuantity') === null) {
        localStorage.setItem('cartQuantity', productquantity);
    }
    if (localStorage.getItem('cartQuantity')) {
        const cartQuantity = parseInt(localStorage.getItem('cartQuantity'));
        $('.cmp-button--cart .cmp-button__text').html(cartQuantity);
    }
    else {
        productquantity = parseInt(localStorage.getItem('cartQuantity'));
        $(".cmp-button--cart .cmp-button__text").html(productquantity);
    }

    _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] ul li:first-child').addClass('hidden');
    _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] ul li:nth-child(2)').addClass('tile__root_selected');
    _cache.pdpModule.find('.tileList__root[data-id="web_subscription"] ul li:nth-child(3)').addClass('tile__root_selected');

    _cache.pdpModule.find('.tileList__root[data-id="web_grind"] ul li:first-child').addClass('tile__root_selected');
    _cache.pdpModule.find('.tileList__root[data-id="web_discovery"] ul li:first-child').addClass('tile__root_selected');
    _cache.pdpModule.find('.tileList__root[data-id="web_flavour"] ul li:first-child').addClass('tile__root_selected');

    const selectedDiscovery = _cache.pdpModule.find('.tileList__root[data-id="web_discovery"] ul li.tile__root_selected').html();
    const selectedSubscription = _cache.pdpModule.find('.tileList__root[data-id="web_subscription"] ul li.tile__root_selected').html();
    const selectedPlanID = _cache.pdpModule.find('.tileList__root[data-id="web_subscription"] ul li.tile__root_selected').data('subscriptionname');

    const selectedQuantity = _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] ul li.tile__root_selected').html();
    const selectedGrind = _cache.pdpModule.find('.tileList__root[data-id="web_grind"] ul li.tile__root_selected').html();

    _cache.pdpModule.find('.tileList__root[data-id="web_subscription"] .selected .defaultvalue').html(selectedSubscription);
    _cache.pdpModule.find('.tileList__root[data-id="web_sendme"] .selected .defaultvalue').html(selectedQuantity);
    _cache.pdpModule.find('.tileList__root[data-id="web_grind"] .selected .defaultvalue').html(selectedGrind);
    _cache.pdpModule.find('.tileList__root[data-id="web_discovery"] .selected .defaultvalue').html(selectedDiscovery);

    _cache.pdpModule.find('.quantityTemplate .option__title span').html(quantitytext);
    _cache.pdpModule.find('.flavourTemplate .option__title span').html(flavourtext);
    _cache.pdpModule.find('.subscriptionTemplate .option__title span').html(frequencytext);
    _cache.pdpModule.find('.bagcountTemplate .option__title span').html(weighttext);
    _cache.pdpModule.find('.grindTemplate .option__title span').html(grindtext);
    _cache.pdpModule.find('.discoveryTemplate .option__title span').html(methodtext);

    let mainsku = '';
    $('ul li').each(function (i) {
        mainsku = $(this).attr('data-frequency'); // This is your rel value
        return false;
    });

    // Display message
    _cache.pdpModule.find('.productFullDetail__root').removeClass('hidden');
});