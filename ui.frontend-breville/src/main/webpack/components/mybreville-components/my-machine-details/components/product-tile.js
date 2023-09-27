import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getAlgoliaProductsMeta } from 'components/mybreville-components/my-orders/helpers';


const ProductTile = ( { productDetails } ) => {
  const [ myMachine, setMyMachine ] = useState( [productDetails] );
  const { t } = useTranslation();

  useEffect( () => {
    getAlgoliaProductsMeta( [productDetails] ).then( ( newProduct ) => {
      ( Array.isArray( newProduct ) && !!newProduct.length ) ? setMyMachine( newProduct ) : setMyMachine( [productDetails] );
    } )
    .catch( ( err ) => {
      console.error( err?.message );
      setMyMachine( [productDetails] );
    } );
  }, [productDetails] );

  const [{ Meta, ProductNumber, convertedNameForMachineProduct, formattedExtendedWarrantyDate }] = myMachine;
  const { orderImages: imageURL } = Meta || {};

  return (
    <div className={ 'registered-product' }>
      <img className={ 'registered-product__item-image' } src={ imageURL } alt={ ProductNumber }></img>
      <div className='registered-product__wrapper'>
        <span className='registered-product__item-name'> { convertedNameForMachineProduct } </span>
        <span className='registered-product__serial'>
          <span>{ t( 'eh-label-mybreville-registered-product-serial' ) }:</span> <span>{ ProductNumber }</span>
        </span>
        <span className='registered-product__registered'>
          <span className='registered-product__icon-registered' />
          <span>{ t( 'eh-label-mybreville-registered-product-registered' ) }</span>
        </span>
        <span className='registered-product__warranty'>
          <span className='registered-product__icon-warranty' />
          <span>{ `${ t( 'eh-label-mybreville-registered-product-extended-warranty' ) }: ${ formattedExtendedWarrantyDate }` } </span>
        </span>
      </div>
    </div>
  );
};

ProductTile.propTypes = {
  productDetails: object
};

export default ProductTile;
