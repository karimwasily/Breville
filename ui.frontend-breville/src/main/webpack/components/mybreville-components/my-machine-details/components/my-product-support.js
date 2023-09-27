import React from 'react';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import SvgIcon from 'xps-react/core/icon';

const MyProductSupport = ( { productName } ) => {
  const { t } = useTranslation();

  return (
    <div className='my-product-support'>
      <h3 className='my-product-support__title'>{ productName } { t( 'eh-title-my-machine-support' ) }</h3>
      <div className='my-product-support__wrapper'>
        <div className='my-product-support__support-hub'>
          <SvgIcon size='30' iconName='settingsWeb' theme='oneFillBlack' />
          <a href='#'>
            { t( 'eh-link-support-hub' ) }
          </a>
        </div>
        <div className='my-product-support__instruction-manual'>
          <SvgIcon size='30' iconName='manualWeb' theme='oneFillBlack' />
          <a href='#'>
            { t( 'eh-link-instruction-manual' ) }
          </a>
        </div>
        <div className='my-product-support__order-parts'>
          <SvgIcon size='30' iconName='orderPartsWeb' theme='oneFillBlack' />
          <a href='#'>
            { t( 'eh-link-order-parts' ) }
          </a>
        </div>
        <div className='my-product-support__bilt-app'>
          <SvgIcon size='30' iconName='biltAppWeb' theme='oneFillBlack' />
          <a href='#'>
            { t( 'eh-link-bilt-app' ) }
          </a>
        </div>
      </div>
    </div>
  );
};

MyProductSupport.propTypes = {
  productName: string
};

export default MyProductSupport;