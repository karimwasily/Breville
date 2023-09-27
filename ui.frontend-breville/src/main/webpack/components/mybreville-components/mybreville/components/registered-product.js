import React from 'react';
import { object } from 'prop-types';
import Button from 'xps-react/core/button';
import { useTranslation } from 'react-i18next';
import { REGISTERED } from '../constant';
import { useHistory } from 'react-router-dom';


const RegisteredProduct = ( props ) => {
  const { product } = props;
  const { t } = useTranslation();
  const history = useHistory();
  const {
    productName,
    ProductNumber,
    Status,
    formattedExtendedWarrantyDate,
    isCoffeeProduct
  } = product;
  const { orderImages } = product?.Meta || {};

  function redirectToMyMachineDetails( path ){
    return function (){
      history.push( path );
    };
  }

  return (
    <div className={ isCoffeeProduct ? 'registered-product registered-product--borderbottom' : 'registered-product' }>
      <img className={ 'registered-product__item-image' } src={ orderImages } alt={ productName }></img>
      <div className='registered-product__wrapper'>
        <span className='registered-product__item-name'> { productName } </span>
        <span className='registered-product__serial'>
          <span>{ t( 'eh-label-mybreville-registered-product-serial' ) }:</span> <span>{ ProductNumber }</span>
        </span>
        { Status === REGISTERED && <span className='registered-product__registered'>
          <span className='registered-product__icon-registered' />
          <span>{ t( 'eh-label-mybreville-registered-product-registered' ) }</span>
        </span> }
        { !!formattedExtendedWarrantyDate && <span className='registered-product__warranty'>
          <span className='registered-product__icon-warranty' />
          <span>{ `${ t( 'eh-label-mybreville-registered-product-extended-warranty' ) }: ${ formattedExtendedWarrantyDate }` } </span>
        </span> }
      </div>
      { isCoffeeProduct && <div className='registered-product__parts-support'>
        <a className='registered-product__icon-text-wrapper' href='#'>
          <span className='registered-product__order-parts' />
          <span>{ t( 'eh-text-order-parts' ) }</span>
        </a>
        <a className='registered-product__icon-text-wrapper' href='#'>
          <span className='registered-product__support' />
          <span>{ t( 'eh-text-support-hub' ) }</span>
        </a>
        <Button
          className='registered-product__button'
          children={ t( 'eh-button-view-details' ) }
          onClick={ redirectToMyMachineDetails( `/my-machine-details?ProductNumber=${ ProductNumber }&ProductName=${ productName }` ) }
          size='small'
          colorScheme='black'
        />
      </div> }
    </div>
  );
};

RegisteredProduct.propTypes = {
  product: object
};

export default RegisteredProduct;