/* eslint-disable */
import request from 'api/request';
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import { v4 as uuidv4 } from 'uuid';
import { redirectResult } from './redirect';
import { handlePaymentResponse } from './showResult';
import { configuration } from 'xps-utils/configuration';
import { analyticsData } from 'xps-utils/analytics';
import axios from "axios";

const analytics = analyticsData();
const configurationData = configuration();

export function payment(paymentLoadingHandler, cartData, userEmail) {
   let paymentSection, paymentData, paymentID, makePaymentElem, tncCheckbox, centAmount, currencyCode, referenceID, emailID, totalAmount, paypalPaymentElem;
   const cartID = localStorage.getItem("cartID");
   const pageObjUrl = document.querySelector("#checkoutComponent");
   paymentSection = document.querySelector("#paymentSection");
   if (paymentSection) {
      tncCheckbox = paymentSection.querySelector(".cmp-form__paynow-checkbox");

      function handleOnChange(state, component) {
         paymentData = state;
      }

      function handleOnAdditionalDetails(state, component) {
         state.data
         component
      }

      if (tncCheckbox) {
         tncCheckbox.addEventListener('change', function (event) {
            if (event.target.checked) {
               makePaymentElem.classList.remove('disabled');
            }
            else {
               makePaymentElem.classList.add('disabled');
            }
         });
      }

      // Payment Option tab
      const navTabs = document.querySelector('.cmp-container__checkout-payment-wrapper .tabs-nav');
      const navTab = document.querySelectorAll('.cmp-container__checkout-payment-wrapper .tabs-nav li a');
      const navContent = document.querySelectorAll('.cmp-container__checkout-payment-wrapper .tab-pane');
      if (navTabs) {
         navTabs.addEventListener('click', function (e) {
            if (e.target && e.target.nodeName === 'A') {
               // change tabs
               navTab.forEach(function (element, i) {
                  navTab[i].classList.remove('active');
               });
               e.target.classList.toggle('active');
               // change content
               navContent.forEach(function (element, i) {
                  navContent[i].classList.remove('active');
               });
               const navTabId = `#${e.target.dataset.tabId}`;
               document.querySelector(navTabId).classList.toggle('active');
            }
         });
      }

      //Get Payment Method
      function getPaymentMethod() {
         analytics.updatePageInfo('payment');
         emailID = userEmail;
         totalAmount = `${configurationData.currencySymbol} ${(cartData.taxedPrice.totalGross.centAmount / 100).toFixed(cartData.taxedPrice.totalGross.fractionDigits)}`
         currencyCode = cartData.taxedPrice.totalGross.currencyCode ? cartData.taxedPrice.totalGross.currencyCode : 'USD';
         centAmount = cartData.taxedPrice.totalGross.centAmount

         request.post('Payment', {
            data: {
               "amountPlanned": {
                  "currencyCode": "USD",
                  "centAmount": centAmount
               },
               "paymentMethodInfo": {
                  "paymentInterface": "ctp-adyen-integration"
               },
               "custom": {
                  "type": {
                     "typeId": "type",
                     "key": "ctp-adyen-integration-web-components-payment-type"
                  },
                  "fields": {
                     "cartIdReference": cartID,
                     "getPaymentMethodsRequest": "{\"countryCode\": \"US\",\"shopperLocale\": \"en-US\"}",

                  }
               }
            },
         }).then(response => {
            paymentID = response.id;
            localStorage.setItem('paymentID', paymentID)
            paymentLoadingHandler(true);
            const availablePaymentMethods = JSON.parse(response.custom.fields.getPaymentMethodsResponse);
            if (availablePaymentMethods && availablePaymentMethods.paymentMethods.length >= 1) {
               for (let i = 0; i < availablePaymentMethods.paymentMethods.length; i++) {
                  if (availablePaymentMethods.paymentMethods[i].name === 'Credit Card') {
                     creditCardPayment(availablePaymentMethods);
                  } else if (availablePaymentMethods.paymentMethods[i].name === 'PayPal') {
                     paypalPayment(availablePaymentMethods);
                  }
               }
            }
         }).catch(error => {
            console.error(error);
            paymentLoadingHandler(false);
         })
      }

      getPaymentMethod();

      function creditCardPayment(availablePaymentMethods) {
         const configuration = {
            locale: "en_US",
            environment: "test", // live environment - https://docs.adyen.com/online-payments/components-web#testing-your-integration.  
            clientKey: "test_HYU6BYDF4BCZ3PUGTSO77MTXQUY67KG6",
            paymentMethodsResponse: availablePaymentMethods,
            showPayButton: true,
            setStatusAutomatically: false,
            onChange: handleOnChange,
            onAdditionalDetails: handleOnAdditionalDetails
         };

         const checkout = new AdyenCheckout(configuration);
         const card = checkout.create("card", {
            hasHolderName: true,
            holderNameRequired: true
         }).mount("#card-container");

         //paymentSection.append(card);
         findButtonEnable(function () {
            paymentSection.classList.remove('hidden');
            paymentSection.querySelector('.totalCartAmount').innerHTML = ' ' + totalAmount;
            document.querySelector(".spinner__dialog").classList.add('hidden');
         });
      }

      function findButtonEnable(callback) {
         const button = setInterval(function () {
            makePaymentElem = paymentSection.querySelector(".adyen-checkout__button--pay");
            if (makePaymentElem) {
               paymentSection.querySelector('.adyen-checkout__button--pay').before(paymentSection.querySelector('#termsAndConditionCard'));
               makePaymentElem.classList.add('disabled');
               makePaymentElem.addEventListener("click", makeCardPayment);
               clearInterval(button);
               callback();
            }
         }, 500);
      }

      function paypalPayment(availablePaymentMethods) {
         const configuration = {
            countryCode: "US",
            environment: "test", // live environment - https://docs.adyen.com/online-payments/components-web#testing-your-integration.  
            clientKey: "test_HYU6BYDF4BCZ3PUGTSO77MTXQUY67KG6",
            setStatusAutomatically: false,
            paymentMethodsResponse: availablePaymentMethods
         };

         const checkout = new AdyenCheckout(configuration);
         checkout.create("paypal", {
            style: {
               color: 'gold'
            },

            onSubmit: (state, component) => {
               if (state.isValid) {
                  analytics.updateAnalytics({ trackMsg: analytics.constVal.ECOMM_CLICK_RULE }, { navComponent: analytics.constVal.CHECKOUT, navSubComponent: analytics.constVal.PAYMENT_BTN });
                  makepayPalPayment(state.data, component);
               }
            },
            onCancel: (data, component) => {
               component.setStatus('ready');
            },
            onError: (error, component) => {
               component.setStatus('ready');
            },
            onAdditionalDetails: (state, component) => {
               paymentSection.querySelector('#paypal-container').classList.add('hidden')
               paymentSection.querySelector('.safer').classList.add('hidden');
               paymentSection.querySelector('.paypalAdditional').classList.remove('hidden');
               paymentSection.querySelector('.totalPaypalCartAmount').innerHTML = ' ' + totalAmount;
               initiatepaypalPayment(JSON.stringify(state.data));
            }
         }).mount("#paypal-container");
         paymentSection.classList.remove('hidden');
         document.querySelector(".spinner__dialog").classList.add('hidden');
      }

      function initiatepaypalPayment(data) {
         const tncPaypalCheckbox = paymentSection.querySelector("#termsAndConditionPaypal");
         paypalPaymentElem = paymentSection.querySelector(".adyen-paypal-payment-btn");
         if (tncPaypalCheckbox) {
            tncPaypalCheckbox.addEventListener('change', function (event) {
               if (event.target.checked) {
                  paypalPaymentElem.classList.remove('disabled');
                  paypalCheckbox(true, data);
               } else {
                  paypalPaymentElem.classList.add('disabled');
                  paypalCheckbox(false);
               }
            });
         }
      }

      function paypalCheckbox(value, data) {
         if (value && data) {
            paypalPaymentElem.addEventListener("click", function () {
               submitDetails(data);
            });
         }
      }

      async function makepayPalPayment(data, component) {
         referenceID = uuidv4();
         const paymentVersion = await request.post('GetPaymentVersion', {
            variables: { "id": paymentID }
         });

         await request.post('Payment', {
            url: paymentID,
            data: {
               "version": paymentVersion.data.me.payment.version,
               "actions": [
                  {
                     "action": "setCustomField",
                     "name": "makePaymentRequest",
                     "value": "{\"amount\": {\"currency\": \"USD\",\"value\": " + centAmount + "},\"paymentMethod\": {\"type\": \"" + data.paymentMethod.type + "\",\"subtype\": \"" + data.paymentMethod.subtype + "\"},\"reference\": \"" + referenceID + "\",\n\t\"shopperReference\": \"" + emailID + "\",\n\t\"shopperEmail\": \"" + emailID + "\",\n\t\"merchantAccount\": \"BrevilleECOM\"}"
                  }
               ]
            },
         }).then(response => {
            const paymentResponse = JSON.parse(response.custom.fields.makePaymentResponse);
            if (paymentResponse.action) {
               component.handleAction(paymentResponse.action);
            } else {
               showFinalResult(response);
            }
         }).catch(error => {
            throw Error(error);
         });
      }

      async function submitDetails(data) {
         if (data) {
            document.querySelector(".spinner__dialog").classList.remove('hidden');
            const paymentVersion = await request.post('GetPaymentVersion', {
               variables: { "id": paymentID }
            });
            await request.post('Payment', {
               url: paymentID,
               data: {
                  "version": paymentVersion.data.me.payment.version,
                  "actions": [
                     {
                        "action": "setCustomField",
                        "name": "submitAdditionalPaymentDetailsRequest",
                        "value": data
                     }
                  ]
               }
            }).then(response => {
               showFinalResult(JSON.parse(response.custom.fields.submitAdditionalPaymentDetailsResponse));
            })
         }
      }

      async function makeCardPayment() {
         if (document.getElementsByClassName("adyen-checkout__error-text").length === 0) {
            analytics.updateAnalytics({ trackMsg: analytics.constVal.ECOMM_CLICK_RULE }, { navComponent: analytics.constVal.CHECKOUT, navSubComponent: analytics.constVal.PAYMENT_BTN });
            document.querySelector(".spinner__dialog").classList.remove('hidden');
            if (paymentData.isValid) {
               const paymentDetails = paymentData.data.paymentMethod;
               const encryptedCardNumber = paymentDetails.encryptedCardNumber;
               const encryptedExpiryMonth = paymentDetails.encryptedExpiryMonth;
               const encryptedExpiryYear = paymentDetails.encryptedExpiryYear;
               const encryptedSecurityCode = paymentDetails.encryptedSecurityCode;
               const holderName = paymentDetails.holderName;
               const returnURL = window.location.origin + pageObjUrl.getAttribute("data-checkoutPage") + ".html";

               referenceID = uuidv4();
               let shopperIP = await axios.get("https://api.ipify.org?format=json");
               shopperIP = shopperIP.data.ip ? shopperIP.data.ip : "192.0.2.1";
               const paymentVersion = await request.post('GetPaymentVersion', {
                  variables: { "id": paymentID }
               });

               request.post('Payment', {
                  url: paymentID,
                  data: {
                     "version": paymentVersion.data.me.payment.version,
                     "additionalData": {
                        "allow3DS2": true
                     },
                     "actions": [
                        {
                           "action": "setCustomField",
                           "name": "makePaymentRequest",
                           value: `{
                              "amount": {"currency": "USD","value": ${centAmount}},
                              "paymentMethod": {"type": "scheme","encryptedCardNumber": "${encryptedCardNumber}","encryptedExpiryMonth": "${encryptedExpiryMonth}","encryptedExpiryYear": "${encryptedExpiryYear}","encryptedSecurityCode": "${encryptedSecurityCode}"},
                              "returnUrl": "${returnURL}",
                              "shopperEmail": "${emailID}",
                              "browserInfo": ${JSON.stringify(paymentData.data.browserInfo)},
                              "channel": "web",
                              "shopperIP": ${JSON.stringify(shopperIP)}
                          }`
                        }
                     ]
                  },
               }).then(response => {
                  const makePaymentResponse = response.custom.fields.makePaymentResponse;
                  showFinalResult(JSON.parse(makePaymentResponse));
               })
            }
         }
      }

      function showFinalResult(response, component) {
         const configuration = {
            locale: "en_US",
            environment: "test", // live environment - https://docs.adyen.com/online-payments/components-web#testing-your-integration.  
            clientKey: "test_HYU6BYDF4BCZ3PUGTSO77MTXQUY67KG6",
            onAdditionalDetails: handleOnAdditionalDetails
         };
         const checkout = new AdyenCheckout(configuration);
         if (response.action) {
            checkout.createFromAction(response.action).mount('#my-container');
         } else {
            handlePaymentResponse(response, pageObjUrl, tncCheckbox, makePaymentElem, getPaymentMethod());
         }
      }

   }
};
redirectResult();