import React from 'react';
import { string } from 'prop-types';

const BundleInfo = ({
  bundlesubscriptionheading,
  bundlesubscriptiontitle,
  bundlesubscriptioninfo,
  bundlesubscriptionok,
  quantityshippedstr
}) => {
function bundlePopupClose(e){
  const bundlePopupContainer = document.querySelector('#id-bundle-subscription');
    if(bundlePopupContainer){
      bundlePopupContainer.classList.remove('shown');
    }
  const bodyClass = document.querySelector('body');
    if(bodyClass){
      bodyClass.classList.remove('modal-open');
    }
  // e.preventDefault();
}
  return (
    <div id="id-bundle-subscription" className="bundle-subscription-popup">
      <div className="add-to-cart-popup--main-content">
          <div className="add-to-cart-popup--container">
            <div className="add-to-cart-popup--close">
                <button onClick = { bundlePopupClose } id="bundle-popup-close" className="add-to-cart-popup--close-button"></button>
            </div>
            <div className="cmp-text--add-to-cart-heading">
                { bundlesubscriptionheading }
            </div>
            <div className="add-to-cart-popup--content">
                  <p className="bundle-subscription--content--text"><strong>{quantityshippedstr}</strong> of <strong>12</strong> {bundlesubscriptiontitle}</p>
                  <p className="bundle-subscription--content--text">{bundlesubscriptioninfo}</p>
                </div>
                <div className="add-to-cart-popup--footer">
                  <button className="btn btn btn-primary" onClick = { bundlePopupClose }>{bundlesubscriptionok}</button>
                </div>
            </div>
          </div>
      </div>
  );
};

BundleInfo.propTypes = {
  bundlesubscriptionheading: string,
  bundlesubscriptiontitle: string,
  bundlesubscriptioninfo: string,
  bundlesubscriptionok: string,
  quantityshippedstr: string
};

export default BundleInfo;
