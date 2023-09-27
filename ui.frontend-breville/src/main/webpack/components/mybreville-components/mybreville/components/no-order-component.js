import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SvgIcon from 'xps-react/core/icon';


function NoOrderComponent() {
  const { t } = useTranslation();

  return (
    <div className='no-order-component'>
      <div className='no-order-component__wrapper'>
        <div className='no-order-component__title'> { t( 'eh-label-order-component-my-orders' ) } </div>
        <div className='no-order-component__link-wrapper'>
          <Link to='/my-orders' className='no-order-component__link'> { t( 'eh-label-order-component-view-all-orders' ) } </Link>
        </div>
        <p className='no-order-component__content'>
          { t( 'eh-no-order-text-you-have-no-recent-orders' ) }
        </p>
      </div>
      <span className='no-order-component__right-chevron'>
        <SvgIcon size='12px' iconName='next12' theme='oneFillBlack' />
      </span>
    </div>
  );
}

NoOrderComponent.propTypes = {

};

export default NoOrderComponent;
