import React, { useState, useEffect } from 'react';
import request from 'api/request';
export const OrderProduct = ( props ) => {
  const productSku = props.variant.sku;
  const quantity = props.quantity;
  let productImagesData, attributeRawData, productatttributesRawData, customFieldData, subscriptionData, grindData, displayName, displayNumber;
  const [ subscriptionDataArray, setSubscriptionDataArray ] = useState( [] );
  const [ grindDataArray, setGrindDataArray ] = useState( [] );
  const [ quantityDataArray, setQuantityDataArray ] = useState( [] );
  const [ productImageURL, setProductImageURL ] = useState( [] );
  const [ webType, setWebType ] = useState( [] );
  const [ subscriptionLabel, setSubscriptionLabel ] = useState( [] );
  const [ selectedGrind, setSelectedGrind ] = useState( [] );
  const [ selectedBagSize, setSelectedBagSize ] = useState( [] );
  const [ productName, setProductName ] = useState( [] );
  const [ vendorName, setVendorName] = useState( [] );

  useEffect( () => {
    let whereQuery;
    if ( productSku.includes( 'PLAN' ) ) {
      // eslint-disable-next-line template-curly-spacing
      whereQuery = `masterData(current(variants(sku in ("${productSku}"))))`;
    }
    else {
      // eslint-disable-next-line template-curly-spacing
      whereQuery = `masterData(current(masterVariant(sku in ("${productSku}"))))`;
    }
    request.post( 'GetProductbySkuService', {
      variables: {
        where: whereQuery,
        includeNames: ['WEB_GRIND', 'WEB_TYPE'],
        locale: 'en-us' 
      }
    } ).then( ( res ) => {
      setProductData( res );
    } );
  }, [] );

  function setProductData( res ) {
    if ( res ){
      productImagesData = res.data.products.results[0].masterData.current.masterVariant.images;
      productatttributesRawData = res.data.products.results[0].masterData.current.masterVariant.attributesRaw;
      attributeRawData = props.variant.attributesRaw;
      customFieldData = props.custom.customFieldsRaw;
      subscriptionData = res.data.products.results[0].skus;
      setDropdowns();
    }
  }
  function displaySubscriptionName( subscriptionName ) {
    let displayName, displayNumber;
    if ( subscriptionName ){
      if ( subscriptionName.includes( 'WEEK' ) ) {
        displayNumber = subscriptionName.split( '_' )[3];
        if ( displayNumber === '1' ) {
          displayName = `${ displayNumber } Week`;
        }
        else {
          displayName = `${ displayNumber } Weeks`;
        }
      }
      else if ( subscriptionName.includes( 'MONTH' ) ) {
        displayNumber = subscriptionName.split( '_' )[3];
        if ( displayNumber === '1' ) {
          displayName = `${ displayNumber } Month`;
        }
        else {
          displayName = `${ displayNumber } Months`;
        }
      }
      else {
        displayName = ' Just One Time';
      }
      return displayName;
    }
  }

  function setDropdowns() {
    if ( customFieldData && customFieldData.length >= 1 ) {
      for ( let i = 0; i < customFieldData.length; i++ ) {
        if ( customFieldData[i].name === 'Grind' ) {
          setSelectedGrind( customFieldData[i].value );
        }
      }
    }
    if ( productatttributesRawData && productatttributesRawData.length >= 1 ) {
      for ( let i = 0; i < productatttributesRawData.length; i++ ) {
        if ( productatttributesRawData[i].name === 'WEB_TYPE' ) {
          let tempWebType;
          tempWebType = productatttributesRawData[i].value['en-US'];
          tempWebType = tempWebType.replace( /['"]+/g, '' );
          setWebType( tempWebType );
        }
      }
    }
    if ( attributeRawData && attributeRawData.length >= 1 ) {
      for ( let i = 0; i < attributeRawData.length; i++ ) {
        if ( attributeRawData[i].name === 'WEB_BAGSIZE' ) {
          let tempbagSize = attributeRawData[i].value['en-US'];
          tempbagSize = tempbagSize.replace( /['"]+/g, '' );
          setSelectedBagSize( tempbagSize );
        }
        if ( attributeRawData[i].name === 'name' ) {
          let tempproductName = attributeRawData[i].value['en-US'];
          tempproductName = tempproductName.replace( /['"]+/g, '' );
          setProductName( tempproductName );
        }
        if ( attributeRawData[i].name === 'vendorName' ) {
        setVendorName(attributeRawData[i].value['en-US']);
      }
      }
    }
    if ( subscriptionData && subscriptionData.length >= 1 ) {
      let subscriptionName, subscriptionLabel;
      for ( let j = 0; j < subscriptionData.length; j++ ) {
        subscriptionName = subscriptionData[j];
        displayName = displaySubscriptionName( subscriptionName );
        if ( subscriptionName.split( '_' )[3] ) {
          displayNumber = subscriptionName.split( '_' )[3];
        }
        else {
          displayNumber = 'justonetime';
        }
        const obj = {
          value: subscriptionName,
          label: displayName,
          displayNumber: displayNumber
        };
        subscriptionDataArray.push( obj );
        if ( productSku === subscriptionName ) {
          subscriptionLabel = displaySubscriptionName( subscriptionName );
          setSubscriptionLabel( subscriptionLabel );
        }
      }
    }
    if ( productImagesData && productImagesData.length >= 1 ) {
      for ( let i = 0; i < productImagesData.length; i++ ) {
        if ( productImagesData[i].label === 'cart' ) {
          if ( productImagesData[i].url.includes ( 'src=' ) ){
            setProductImageURL( productImagesData[i].url.split( 'src=\"' )[1].split( '\"' )[0] );
          }
          else {
            setProductImageURL( productImagesData[i].url );
          }
        }
      }
    }
  }
  return (
        <div className='order-confirmation__success-col' data-line-item-id='' id=''>
          <div className='order-confirmation__success-details'>
            <div className='order-confirmation__prod-img-container'>
              <img src={ productImageURL } className='order-confirmation__prod-img' alt='cartImage' />
            </div>
            <div className='order-confirmation__order-list-details'>
              <div className='order-confirmation__listWithRightBorderBrown mb-xs-2'>
                <span className='pl-0'> </span>
                <span>{ vendorName } | { webType }</span>
              </div>
              <div className='h3 order-confirmation__displayName'>{ productName }</div>
              <p className='order-confirmation__checkout-details'>
                <span className='checkoutQuantity'>{ quantity } x { selectedBagSize } Bags,</span>
                <span className='checkoutFrequency'>{ subscriptionLabel },</span>
                <span className='checkoutGrind'>{ selectedGrind }</span>
              </p>
            </div>
          </div>
        </div>
  );
};