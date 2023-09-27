import React from 'react';
import DeliverySvg from 'resources/svgs/delivery.svg';
import CoffeeBagSvg from 'resources/svgs/coffee-bag-small.svg';
import BaristaTrainingSvg from 'resources/svgs/barista-training.svg';

export const WhatHappensNext = ( props ) => {
  const { isLogged, isBundle, isDynamicBundle } = props;

  return (
    <section className='cmp-what-happens-next mb-25'>
      <h3 className='cmp-what-happens-next__title'>Here's what happens next.</h3>
      <div className='cmp-what-happens-next__wrapper'>
        <div className='display-flex'>
          <DeliverySvg className='mr-20' />
          <div>
            <h6 className='cmp-what-happens-next__subtitle'>Your order will arrive between 5-7 days.</h6>
            { isLogged && <p className='cmp-what-happens-next__description'>Log in to your account on <a className='cmp-what-happens-next__link' href='https://breville.com'>Breville.com</a> to check order and delivery status.</p> }
            { !isLogged && <p className='cmp-what-happens-next__description'>Keep an eye on your email for delivery updates.</p> }
          </div>
        </div>
        { isDynamicBundle &&
          <div className='display-flex mb-20 mt-20'>
            <CoffeeBagSvg className='mr-20' />
            <div>
              <h6 className='cmp-what-happens-next__subtitle'>Your coffee will be roasted fresh and shipped to you.</h6>
              <p className='cmp-what-happens-next__description'>View, edit and manage your subscription on <a className='cmp-what-happens-next__link' href='https:/beanz.com'>Beanz.com</a>.</p>
            </div>
          </div>
        }
        { ( isBundle && !isDynamicBundle ) &&
        <div className='display-flex mb-20 mt-20'>
          <CoffeeBagSvg className='mr-20' />
          <div>
            <h6 className='cmp-what-happens-next__subtitle'>Your coffee will be roasted fresh and shipped to you.</h6>
            <p className='cmp-what-happens-next__description'>If you love the coffee gift, reorder at <a className='cmp-what-happens-next__link' href='https:/beanz.com'>Beanz.com</a>.</p>
          </div>
        </div>
        }
        { isDynamicBundle &&
          <div className='display-flex'>
            <BaristaTrainingSvg className='mr-20' />
            <div>
              <h6 className='cmp-what-happens-next__subtitle'>Book your FREE Virtual Barista Training.</h6>
              <p className='cmp-what-happens-next__description'>Be on the lookout for the sign-up email.</p>
            </div>
          </div>
        }
      </div>
    </section>
  );

};

export default WhatHappensNext;