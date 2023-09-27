import React from 'react';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from 'xps-react/core';

const MyProductItemEmpty = ( { className } ) => {

  const { t } = useTranslation();
  const buttonUrl = 'https://brevilleusa.secure.force.com/reg/productregistrationWeb?param=AU&language=en_AU&brand=Breville';

  return (
    <div className={ `my-product-empty ${ className || '' }` }>
      <p className='my-product-empty__title'>{ t( 'eh-label-add-your-products-to-dashboard' ) }</p>
      <div className='my-product-empty__button-wrapper'>
        <Button
          className='my-product-empty__button'
          size='small'
          colorScheme='black'
          target='_blank'
          href={ buttonUrl }
        >
          { t( 'eh-label-add-a-product' ) }
        </Button>
      </div>
      <div className='my-product-empty__tile my-product-empty__tile--warranty'>
        <span className='my-product-empty__tile-icon'></span>
        <p className='my-product-empty__tile-text'>
          { t( 'eh-text-access-and-manage-your-warranty' ) }
        </p>
      </div>
      <div className='my-product-empty__tile my-product-empty__tile--tutorial'>
        <span className='my-product-empty__tile-icon'></span>
        <p className='my-product-empty__tile-text'>
          { t( 'eh-text-personalized-tutorials-and-support' ) }
        </p>
      </div>
      <div className='my-product-empty__tile my-product-empty__tile--machine'>
        <span className='my-product-empty__tile-icon'></span>
        <p className='my-product-empty__tile-text'>
          { t( 'eh-text-master-your-machine-with-our-expert-masterclasses' ) }
        </p>
      </div>
    </div>
  );
};

MyProductItemEmpty.propTypes = {
  className: string
};

export default MyProductItemEmpty;