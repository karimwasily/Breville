import React, { useEffect, useState, Fragment } from 'react';
import { Row, Col } from 'xps-react/core/layout';
import request from 'library/api/request';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
export const Item = ( props ) => {
  let productImagesData, attributeRawData, productatttributesRawData, customFieldData, subscriptionData, grindData, displayName, displayNumber;
  const [subscriptionDataArray, setSubscriptionDataArray] = useState( [] );
  const [productImageURL, setProductImageURL] = useState( [] );
  const [webType, setWebType] = useState( [] );
  const [subscriptionLabel, setSubscriptionLabel] = useState( [] );
  const [selectedGrind, setSelectedGrind] = useState( [] );
  const [selectedFlavourNote, setSelectedFlavourNote] = useState( [] );
  const [selectedBrewMethod, setSelectedBrewMethod] = useState( [] );
  const [selectedBagSize, setSelectedBagSize] = useState( [] );
  const [productName, setProductName] = useState( [] );
  const [vendorName, setVendorName] = useState( [] );
  const productSku = props.variant.sku;
  const quantity = props.quantity;
  const beanPrice = props.price;
  const taxedPrice = props.taxedPrice;
  const cartPageURL = `${ document.querySelector( '#checkoutComponent' ).getAttribute( 'data-cartpage' ) }.html`;
  const isSmallScreen = useMediaQuery( { query: '(max-device-width: 720px)' } );
  const isDiscovery = productSku.includes( 'DISCOVERY' );
  const left = classNames( {
    left: isSmallScreen
  } );
  function setProductData( res ) {
    if ( res ) {
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
    if ( subscriptionName ) {
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
        if ( customFieldData[i].name === 'Flavour_Notes' ) {
          setSelectedFlavourNote( customFieldData[i].value );
        }
        if ( customFieldData[i].name === 'Brewing_Method' ) {
          setSelectedBrewMethod( customFieldData[i].value );
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
          let vendorName = attributeRawData[i].value['en-US'];
          vendorName = vendorName.replace( /['"]+/g, '' );
          setVendorName( vendorName );
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
          if ( productImagesData[i].url.includes( 'src=' ) ) {
            setProductImageURL( productImagesData[i].url.split( 'src=\"' )[1].split( '\"' )[0] );
          }
          else {
            setProductImageURL( productImagesData[i].url );
          }
        }
      }
    }
  }
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
  const link = <a href={ cartPageURL } class='cmp-text__checkout-order-list-title-edit'>Edit</a>;
  if ( !props.details ) {
    return (
      <Fragment>
        <Row className='cmp-row__checkout-order--details'>
          <Col><h4 className={ `${ left } cmp-text__checkout-order-list-title-h4 ` }>{ subscriptionLabel }</h4></Col>
          <Col className='text-right'>{ link }</Col>
        </Row>
        <Row>
          <Col><hr className='cmp-hr__border-bottom' /></Col>
        </Row>
      </Fragment>
    );
  }
  return (
    <div class='overflow-hidden cmp-container__checkout-product-details'>
      <div class='cmp-teaser__checkout-order-wrapper'>
        <div class='cmp-teaser__checkout-order-wrapper-left'>
          <div class='cmp-teaser__checkout-order-list-detail-wrapper'>
            <div class='cmp-text__checkout-order-list-title'>
              <div class='row'>
                <div class='cmp-container__checkout--column-9'>
                  <h4 class='cmp-text__checkout-order-list-title-h4'>{ subscriptionLabel.includes( 'Just One Time' ) ? subscriptionLabel : `Every ${ subscriptionLabel }` }
                  </h4>
                </div>
                <div class='cmp-container__checkout--column-3'>
                  <h4 class='cmp-text__checkout-order-list-title-h4 text-right'>
                    { link }
                  </h4>
                </div>
              </div>
            </div>
            <div class='cmp-teaser__checkout-order--content-details accordion-expanded'>
              <div class='cmp-container__checkout--order-item'>
                <div class='row'>
                  <div class='cmp-container__checkout--column-4'>
                    <div class='cmp-container__order-list-image-container'>
                      <img class='cmp-image__order-list-image'src={ productImageURL } alt={ productName } />
                    </div>
                  </div>
                  <div class='cmp-container__checkout--column-8'>
                    <div class='cmp-container__order-list-details'>
                      { !isDiscovery ? <Fragment>
                        <div class='cmp-text__checkout-order-category'>
                          <span class='cmp-text__checkout-order-category-item'>{ vendorName }</span>
                          <span class='cmp-text__checkout-order-category-item'>{ webType }</span>
                        </div>
                      </Fragment> : <Fragment>
                        <div class='cmp-text__checkout-order-category'>
                          <span class='cmp-text__checkout-order-category-item'>{ selectedFlavourNote }</span>
                          <span class='cmp-text__checkout-order-category-item'>{ selectedBrewMethod }</span>
                        </div>
                      </Fragment> }
                      <h2 class='cmp-title__order-list-details'>{ productName }</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class='checkout-single-list-details'>
                <div class='row'>
                  <div class='cmp-grid-column-md-8 offset-md-4'>
                    <div class='cmp-text__order-item-price-shipping'>
                      { !subscriptionLabel.includes( 'Just One Time' ) &&
                      <ul class='cmp-text__order-item-price-shipping-ul'>
                        <li class='cmp-text__order-item-price-shipping-li cmp-text__order-item-price-shipping-subscription'>
                          Subscription
                        </li>
                        <li class='cmp-text__order-item-price-shipping-li font-bold'>
                          Cost Per Order
                        </li>
                      </ul> }
                      <ul class='cmp-text__order-item-price-shipping-ul border-none'>
                        <li class='cmp-text__order-item-price-shipping-li'>Details</li>
                        <li class='cmp-text__order-item-price-shipping-li font-bold'>
                          { quantity } x { selectedBagSize } Bags, { subscriptionLabel }, { selectedGrind } <br /> ${ ( beanPrice.value.centAmount.toFixed( 2 ) / 100 ).toFixed( 2 ) }
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='border-bottom-black'>
            <div class='row'>
              <div class='cmp-grid-column-md-8 offset-md-4'>
                <div class='cmp-text__order-item-price-shipping'>
                  <ul class='cmp-text__order-item-price-shipping-ul'>
                    <li class='cmp-text__order-item-price-shipping-li'>Taxes</li>
                    <li class='cmp-text__order-item-price-shipping-li font-bold'>${ taxedPrice ? ( ( taxedPrice.totalGross.centAmount - taxedPrice.totalNet.centAmount ) / 100 ).toFixed( 2 ) : 0.00 }</li>
                  </ul>
                  <ul class='cmp-text__order-item-price-shipping-ul'>
                    <li class='cmp-text__order-item-price-shipping-li font-bold'>Sub Total</li>
                    <li class='cmp-text__order-item-price-shipping-li font-bold'>${ props.taxedPrice !== null ? ( props.taxedPrice.totalGross.centAmount / 100 ).toFixed( 2 ) : ( props.totalPrice.centAmount / 100 ).toFixed( 2 ) }</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};