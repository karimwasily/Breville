/*  This javascript code will validate the live chat. 
    JS Snippet to trigger Live Chat Availability on the page load, is it Available or Offline.*/
    
/* eslint no-console: 0 */
/*
 * liveChat.js
 * @project:    SN-RO
 * @date:       2021-03-16
 * @author:
 * @licensor:   Mahesh
 * @namespaces: snro
 */

//this will cause the browser to check for errors more aggressively

function bindEvents(_cache) {
    const elementNotAvail = document.querySelector(".liveAgentNotAvailable");
    if (elementNotAvail) {
        elementNotAvail.addEventListener('click', event => {
            const strWindowFeatures = 'location=yes,height=570,width=520,scrollbars=yes,status=yes';
            const URL = _cache.config.offlineFormUrl;
            window.open(URL, '_blank', strWindowFeatures);
        });
    }

    const elementAvail = document.querySelector(".liveAgentAvailable");
    if (elementAvail) {
        elementAvail.addEventListener('click', event => {
            liveagent.startChat(_cache.config.buttonId);
        });
    }
}

function callLiveChat(_cache, callback) {
    const curencyCode = _cache.config.currencyCode;
    if (!window._laq) { window._laq = []; }
    window._laq.push(function () {
        liveagent.showWhenOnline(_cache.config.buttonId, document.getElementById('liveagent_button_online_' + _cache.config.buttonId));
        liveagent.showWhenOffline(_cache.config.buttonId, document.getElementById('liveagent_button_offline_' + _cache.config.buttonId));
    });

    const chatLanguage = 'en';
    const chatLocation = 'USA';
    liveagent.setChatWindowHeight(772);
    liveagent.setChatWindowWidth(482);
    liveagent.addCustomDetail('Curency Code', curencyCode);
    liveagent.addCustomDetail('Brand', 'Breville');
    liveagent.addCustomDetail('Country', chatLocation);
    liveagent.addCustomDetail('Language', chatLanguage);
    liveagent.addButtonEventHandler(_cache.config.buttonId, function (e) {
        if (e === liveagent.BUTTON_EVENT.BUTTON_AVAILABLE) {
            console.log('Available');
            document.querySelector(".liveagent").classList.add("liveAgentAvailable");
        } else if (e === liveagent.BUTTON_EVENT.BUTTON_UNAVAILABLE) {
            console.log('Not Available');

            const div = document.createElement("div");
            const para = document.createElement("p");            
            const node = document.createTextNode("We are currently offline");
            para.appendChild(node);

            div.classList.add("cmp-teaser__description");          
            div.appendChild(para);
            const element = document.querySelector(".cmp-container--livechat .cmp-teaser__content");
            if(element){
                element.appendChild(div);
            }
            
            document.querySelector(".liveagent").classList.add("liveAgentNotAvailable");
        }
        callback();
    });
    liveagent.init(_cache.config.deploymentJs, _cache.config.deploymentId, _cache.config.orgId);
}

function init() {
    const _cache = {};
    _cache.section = document.querySelector('.cmp-container--livechat .liveagent');

    // if elem hook exists on page
    if (_cache.section) {
        _cache.orgid = _cache.section.dataset.orgId;
        _cache.config = JSON.parse(_cache.section.dataset.config);
        callLiveChat(_cache, function () {
            bindEvents(_cache);
        });
    }
}
//document.addEventListener("DOMContentLoaded", init);

function isScriptLoaded(src){
    return document.querySelector('script[src="' + src + '"]') ? true : false;
}

(function(){
    const script = document.createElement('script');
    script.src = "https://c.la2-c1cs-iad.salesforceliveagent.com/content/g/js/50.0/deployment.js";
    document.head.appendChild(script);
    script.onload = () => {
       const scriptLoaded = isScriptLoaded('https://c.la2-c1cs-iad.salesforceliveagent.com/content/g/js/50.0/deployment.js');
       if(scriptLoaded){
        init();
       }
    };  
})();