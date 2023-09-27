import React from 'react';
import { string } from 'prop-types';

const CoffeeSelection = ({
  coffeeselectionheading,
  coffeeselectiondescription,
  quizheading,
  quizdescription,
  quizpagelink,
  beanzheading,
  beanzdescription,
  beanzpagelink,
  beanzimagepath,
  discoverybeanzheading,
  discoverybeanzdescription,
  discoverybeanzpagelink,
  discoverybeanzimagepath,
  popupbtnlbl
}) => {
function selectCoffeeClose(e){
  const selectCoffeeContainer = document.querySelector('#id-select-coffee');
    if(selectCoffeeContainer){
      selectCoffeeContainer.classList.remove('shown');
    }
  const bodyClass = document.querySelector('body');
    if(bodyClass){
      bodyClass.classList.remove('modal-open');
    }
  // e.preventDefault();
}
  return (
    <div id="id-select-coffee" className="change-coffee-popup">
        <div className="add-to-cart-popup--main-content">
           <div className="add-to-cart-popup--container">
              <div className="add-to-cart-popup--close">
                 <button onClick = { selectCoffeeClose }id="add-to-cart-popup-close" className="add-to-cart-popup--close-button"></button>
              </div>
              <div className="cmp-text--add-to-cart-heading">
              { coffeeselectionheading }
              </div>
              <div className="add-to-cart-popup--content">
                 <div className="add-to-cart-popup-content--details">
                    <div className="change-coffee--content--card-box">
                      <p className="change-coffee--content--text">{ coffeeselectiondescription }</p>
                      {/* Hiding this questionnaire is out of scope. Uncomment when we need to activate Questionnaire */}
                      {/* <a href={quizpagelink}>
                      <div className="change-coffee--content--card-item">
                        <img className="change-coffee--content--card-item--img" src="https://breville-production-aem-assets.s3-us-west-2.amazonaws.com/Beanz+Marketpace+Coffee+bags/pitalito.madcap-600/pdp.jpg" />
                        <div className="change-coffee--content--card-body">
                          <p className="change-coffee--content--card-title">{ quizheading }</p>
                          <p className="change-coffee--content--card-p">{ quizdescription }</p>
                        </div>
                      </div>
                      </a> */}
                      <a href={beanzpagelink}>
                      <div className="change-coffee--content--card-item">
                        <img className="change-coffee--content--card-item--img" src={ beanzimagepath } />
                        <div className="change-coffee--content--card-body">
                          <p className="change-coffee--content--card-title">{ beanzheading }</p>
                          <p className="change-coffee--content--card-p">{ beanzdescription }</p>
                        </div>
                      </div>
                      </a>
                      <a href={discoverybeanzpagelink}>
                      <div className="change-coffee--content--card-item">
                        <img className="change-coffee--content--card-item--img" src={ discoverybeanzimagepath } />
                        <div className="change-coffee--content--card-body">
                          <p className="change-coffee--content--card-title">{ discoverybeanzheading }</p>
                          <p className="change-coffee--content--card-p">{ discoverybeanzdescription }</p>
                        </div>
                      </div>
                      </a>
                      <div className="add-to-cart-popup--footer">
                        <button onClick={ selectCoffeeClose } className="btn btn-primary-faded  fluid">{ popupbtnlbl }</button>
                     </div>
                    </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
  );
};

CoffeeSelection.propTypes = {
  coffeeselectionheading: string,
  coffeeselectiondescription: string,
  quizheading: string,
  quizdescription: string,
  quizpagelink: string,
  beanzheading: string,
  beanzdescription: string,
  beanzpagelink: string,
  beanzimagepath: string,
  discoverybeanzheading: string,
  discoverybeanzdescription: string,
  discoverybeanzpagelink: string,
  discoverybeanzimagepath: string,
  popupbtnlbl: string
};

export default CoffeeSelection;
