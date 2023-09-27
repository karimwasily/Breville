import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Row, Col } from 'xps-react/core';
import Select from 'react-select';
import { deleteCart, getProduct, updateLineItem, updateQuantityOfBags, updateGrind } from 'library/store/cart/actions';
import { displaySubscriptionName } from './Helper';
import { selectProductsData, selectProducts, selectShippingInfo, selectDiscountedCode } from 'library/store/cart/selector';
import { checkCookie } from 'xps-utils/cookie';
import { analyticsData } from 'xps-utils/analytics';
const analytics = analyticsData();

export const CartProduct = ( {product,aemData} ) => {
  const productSku = product.variant.sku;
  const products = useSelector( selectProductsData );
  const cartProducts = useSelector( selectProducts );
  const shippingInfo = useSelector( selectShippingInfo );
  const discountedCode = useSelector( selectDiscountedCode );
  const dispatch = useDispatch();
  const currentProductData = products[productSku];
  let productName, vendorName, bagSize, grindData, shippingCost, flavourCategory;
  const [ productImageURL, setProductImageURL ] = useState( [] );
  const [ subscriptionDataArray, setSubscriptionDataArray ] = useState( [] );
  const [ grindDataArray, setGrindDataArray ] = useState( [] );
  const [ quantityDataArray, setQuantityDataArray ] = useState( [] );
  const [ subscriptionHeaderName, setSubscriptionHeaderName ] = useState( [] );
  const [ showSubscriptionIcon, setShowSubscriptionIcon ] = useState( [] );
  const [ webType, setWebType ] = useState( [] );
  const [ productUrl, setProductUrl ] = useState( [] );
  const productId = product.id;
  const productQuantity = product.quantity;
  const productPriceCurrencyCode = product.price.value.currencyCode;
  const productPrice = ( product.price.value.centAmount / 100 ).toFixed( 2 );
  const productTotalPrice = ( productPrice * productQuantity ).toFixed( 2 );
  const productGrind = product.custom.customFieldsRaw[0].value;
  const productFlavourNotes = product?.custom?.customFieldsRaw[1]?.value;
  const productBrewingMethod = product?.custom?.customFieldsRaw[2]?.value;
  const productLineItemAttributeRawData = product.variant.attributesRaw;
  let displayName, displayNumber;
  let productImagesData, attributeRawData, subscriptionData;
  let isDiscovery = productSku.includes('DISCOVERY') ? true : false;

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
    dispatch( getProduct( whereQuery, productSku ) );

  }, [] );

  useEffect( () => {
    if ( currentProductData ){
      setDropdownFilters( currentProductData );
    }
  }, [currentProductData] );

  const reactSelectDropdownStyles = {
    option: ( styles, { isSelected } ) => {
      return {
        ...styles,
        backgroundColor: isSelected ? '#f8f9fa' : null,
        color: isSelected ? '#202020' : null
      };
    }
  };
  
  //Cart Buttons Visibility
  let optionArr = [];
  let btnOneAvailable = [], selectedFrequencyOption, cartTimer;
  function buttonArr() {
    optionArr = [];
    $('.cmp-cart-order-details-dd .subscription').each(function () {
      selectedFrequencyOption = $(this).find('.react-select__single-value').html();
      optionArr.push(selectedFrequencyOption);
    });
    return optionArr;
  }

    function showorHideGuestButton() {
      btnOneAvailable = [];
      btnOneAvailable = buttonArr();
      btnOneAvailable = btnOneAvailable.toString();
      if(btnOneAvailable){
        if(btnOneAvailable.search("Week") === -1){
          sessionStorage.setItem('subscriptionPlan', 'false');
        }else{
          sessionStorage.setItem('subscriptionPlan', 'true');
        }
      }else{
        sessionStorage.setItem('subscriptionPlan', 'false');
      }
      buttonVisibility();
}

  function buttonVisibility() {
    var buttonCountryCode = 'US';
    if (localStorage.getItem('cartEmpty') === 'false' || localStorage.getItem('cartEmpty') === null) {
      if (checkCookie('auth0.is.authenticated') !== true) {
          //guest user
        if (buttonCountryCode === 'US') {
          if (sessionStorage.getItem('subscriptionPlan') === 'true') {
             //subscription present
              $('.guest-checkout').addClass('hidden');
              $('.cmp-title--continue, #container_cart--continue_login_buttons').removeClass('hidden');
          } else {
            //no subscription
              if ( !discountedCode?.length > 0 ){
                $('.guest-checkout').removeClass('hidden');  
              }    
              $('.cmp-title--continue, #container_cart--continue_login_buttons').removeClass('hidden');
          }
        }
      } else {
          //logged in user
          $('#container_cart--continue_login_buttons').addClass('hidden');
          $('.guest-checkout').addClass('hidden');
          $('.cmp-title--continue, .checkout-btn').removeClass('hidden');
      }
    } else {
        //cart empty
        $('.cmp-title--continue, #container_cart--continue_login_buttons').addClass('hidden');
        $('.guest-checkout, .checkout-btn').addClass('hidden');
    }
  }

  function setEmptyDropdowns(){
    setQuantityDataArray( [] );
    setGrindDataArray( [] );
    setSubscriptionDataArray( [] );
    productImagesData = [];
    attributeRawData = [];
    subscriptionData = [];
  }

  function setDropdownFilters( res ) {
    if ( res ){
      setEmptyDropdowns();
      productImagesData = res[0].masterData.current.masterVariant.images;
      attributeRawData = res[0].masterData.current.masterVariant.attributesRaw;
      subscriptionData = res[0].skus;
      setProductUrl( '../beans/product/' + res[0].masterData.current.slug + '.html' );
      setDropdowns();
    }
  }

  function displayQuantityOptions( bagSize ) {
    const qDataArray = [];
    let obj = [];
    for ( let k = 1; k <= 5; k++ ) {
      if(isDiscovery){
        if(k === 1){
          k = k + 1;
        }
        obj = {
          value: `${ k } Bags`,
          label: `${ k } Bags`
        };
      }
      else{
        obj = {
          value: `${ k }x${ bagSize }`,
          label: `${ k } x ${ bagSize }`
        };
      }
      qDataArray.push( obj );
    }
    setQuantityDataArray( qDataArray );
    if(isDiscovery){
      setselectedQuantityOption( { label: `${ productQuantity } Bags` } );
    }
    else{
      setselectedQuantityOption( { label: `${ productQuantity } x ${ bagSize }` } );
    }
  }

  function displayGrindOptions( grindData ) {
    grindData = JSON.parse( grindData['en-US'] );
    const gDataArray = [];
    for ( let l = 0; l < grindData.length; l++ ) {
      const obj = {
        value: grindData[l],
        label: grindData[l]
      };
      gDataArray.push( obj );
    }
    setGrindDataArray( gDataArray );
    var temp = { label: `${ productGrind }` };
    setselectedGrindOption( temp );
  }

  if ( productLineItemAttributeRawData && productLineItemAttributeRawData.length >= 1 ) {
    for ( let i = 0; i < productLineItemAttributeRawData.length; i++ ) {
      if ( productLineItemAttributeRawData[i].name === 'name' ) {
        productName = productLineItemAttributeRawData[i].value['en-US'];
        productName = productName.replace( /["]+/g, '' );
      }
      if ( productLineItemAttributeRawData[i].name === 'vendorName' ) {
        vendorName = productLineItemAttributeRawData[i].value['en-US'];
      }
      if ( productLineItemAttributeRawData[i].name === 'WEB_BAGSIZE' ) {
        bagSize = JSON.stringify( productLineItemAttributeRawData[i].value ).split( '\\\"' )[1];
      }
      /*if ( productLineItemAttributeRawData[i].name === 'WEB_FLAVOURCATEGORY' ) {
        flavourCategory = JSON.parse(Object.values(productLineItemAttributeRawData[i]?.value)[0]);
        if(flavourCategory) flavourCategory = flavourCategory.join( ' | ' );
      }*/
    }
  }

  function settingSubscriptionHeaderName( subscriptionLabel ) {
    if ( subscriptionLabel.includes( 'Just' ) ) {
      setSubscriptionHeaderName( subscriptionLabel );
      setShowSubscriptionIcon( false );
    }
    else {
      setSubscriptionHeaderName( `Every ${ subscriptionLabel }` );
      setShowSubscriptionIcon( true );
    }
    
    cartTimer = setTimeout(function () {
      showorHideGuestButton();
      clearTimeout(cartTimer);
    }, 50);
  }

  function setDropdowns() {
    if ( attributeRawData && attributeRawData.length >= 1 ) {
      for ( let i = 0; i < attributeRawData.length; i++ ) {
        if ( attributeRawData[i].name === 'WEB_GRIND' ) {
          grindData = attributeRawData[i].value;
          displayGrindOptions( grindData );
        }
        if ( attributeRawData[i].name === 'WEB_TYPE' ) {
          let tempWebType;
          tempWebType = attributeRawData[i].value['en-US'];
          tempWebType = tempWebType.replace( /['"]+/g, '' );
          setWebType( tempWebType );
        }
      }
    }

    if ( subscriptionData && subscriptionData.length >= 1 ) {
      let subscriptionName, subscriptionLabel, newSubData = [], discoveryBeanzType;
      const subDataArray = [];
      if(isDiscovery){
        discoveryBeanzType = productSku;
        if(productSku.includes('PLAN')){
          discoveryBeanzType = productSku.split( '_' )[0];
        }
        subscriptionData.forEach(function(val, i){
          if(val.includes(discoveryBeanzType) && val.includes('PLAN')){
            newSubData.push(val);
            subscriptionData = newSubData;
          }
        });
      }
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
        subDataArray.push( obj );
        if ( productSku === subscriptionName ) {
          subscriptionLabel = displaySubscriptionName( subscriptionName );
        }
      }
      setSubscriptionDataArray( subDataArray );
      setselectedSubscriptionOption( { label: subscriptionLabel } );
      settingSubscriptionHeaderName( subscriptionLabel );
    }

    displayQuantityOptions( bagSize );
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

  const [selectedSubscriptionOption, setselectedSubscriptionOption] = useState();
  const [selectedQuantityOption, setselectedQuantityOption] = useState();
  const [selectedGrindOption, setselectedGrindOption] = useState();

  const onChangeSubscriptionHandler = ( selectedSubscriptionOption ) => {
    setselectedSubscriptionOption( selectedSubscriptionOption );
    settingSubscriptionHeaderName( selectedSubscriptionOption.label );
    analytics.updateAnalyticsData('onload', products);
  };
  const onChangeQuantityHandler = ( selectedQuantityOption ) => {
    setselectedQuantityOption( selectedQuantityOption );
    analytics.updateAnalyticsData('onload', products);
  };
  const onChangeGrindHandler = ( selectedGrindOption ) => {
    setselectedGrindOption( selectedGrindOption );
    analytics.updateAnalyticsData('onload', products);
  };

  function removeProduct() {
    dispatch( deleteCart( productId ) );
    analytics.updateAnalyticsData('remove', productId);
    cartTimer = setTimeout(function () {
      showorHideGuestButton();
      clearTimeout(cartTimer);
    }, 3000);
  }
  function updateLineItemincart( evt ) {
    dispatch( updateLineItem( productId, productSku, productQuantity, productGrind, evt.value ) );
  }
  function updateQuantityOfBagsincart( evt ) {
    dispatch( updateQuantityOfBags( productId, productSku, productQuantity, productGrind, evt.value ) );
  }
  function updateGrindincart( evt ) {
    dispatch( updateGrind( productId, productSku, productQuantity, productGrind, evt.value ) );
  }
  if ( shippingInfo?.price?.centAmount > 0 ){
    shippingCost = ( shippingInfo.price.centAmount / 100 ).toFixed( 2 );
  }

  return (
    <Grid className='cmp-cart_product-container nopadding'>
      <div className='cmp-cart_order-title'>
        <Row>
          <div className='col-7'>
            <div className='h4 cartwrapper__order-no'>{ subscriptionHeaderName }</div>
          </div>
          <div className='col-5 nopadding'>
            <Row>
              <div className='col-6'>
                <div className='h4 cartwrapper__order-no cmp-cart_order-title-details'>Details</div>
              </div>
              <div className='col-6'>
                <div className='h4 cmp-cart_product-container--remove'>
                  <a href='#' className='cmp-cart_product-container--remove-a' onClick={ removeProduct }>Remove</a>
                </div>
              </div>
            </Row>
          </div>
        </Row>
      </div>
      <div className='cmp-cart-order-details'>
        <div className='row'>
          <div className='col-sm-7'>
            <div className='row'>
              <div className='col-4 text-center'>
                <div className='cartwrapper__order-list-img-container'>
                  <a href={productUrl} className='cartwrapper__order-list-img-url'>
                    <img className='img-fluid cartwrapper__order-list-img-container-img' src={ productImageURL } alt='cart product' />
                  </a>
                </div>
              </div>
              <div className='col-8'>
                <div className='cartwrapper__order-list-details'>
                { !isDiscovery ? <Fragment>
                    <div className='listWithRightBorderBrown'>
                      <span className='listWithRightBorderBrown-span' > { vendorName } </span>
                      <span className='listWithRightBorderBrown-span cartwrapper__order-vendordetails--seperator'>|</span>
                      <span className='listWithRightBorderBrown-span' > { webType } </span>
                    </div>
                    </Fragment> : <Fragment>
                    <div className='listWithRightBorderBrown'>
                      <span className='listWithRightBorderBrown-span' > { productFlavourNotes } </span>
                      <span className='listWithRightBorderBrown-span cartwrapper__order-vendordetails--seperator'>|</span>
                      <span className='listWithRightBorderBrown-span' > { productBrewingMethod }</span>
                    </div>
                  </Fragment> }
                  <h2 className='cartwrapper__displayName'>{ productName }</h2>
                  <div className='cartwrapper__listWithLeftIcon'>
                    <div className='cartwrapper__listWithLeftIcon--item'>
                      <div className='cartwrapper__listWithLeftIcon--content'>
                        { showSubscriptionIcon ? <Fragment> <div className='cartwrapper__listWithLeftIcon--s-icon'></div> Subscription </Fragment> : null }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-5'>
            <div className='cmp-cart-order-details-dd'>
              <div className='form-group row  align-items-center subscription'>
                <label className='col-sm-4 col-3 cmp-cart-order-details-dropdown-label'>{aemData.frequencyText}</label>
                <div className='col-sm-8 col-9'>
                  <div className='cmp-cart-order-details-dropdown-values fluid dropdown'>
                    <Select className='react-select-container' classNamePrefix='react-select'
                      value={ selectedSubscriptionOption }
                      onChange={ onChangeSubscriptionHandler, updateLineItemincart }
                      options={ subscriptionDataArray }
                      styles={ reactSelectDropdownStyles }
                    />
                  </div>
                </div>
              </div>
              <div className='form-group row  align-items-center'>
                <label className='col-sm-4 col-3 cmp-cart-order-details-dropdown-label'>{aemData.quantityText}</label>
                <div className='col-sm-8 col-9'>
                  <div className='cmp-cart-order-details-dropdown-values fluid dropdown'>
                    <Select className='react-select-container' classNamePrefix='react-select'
                      value={ selectedQuantityOption }
                      onChange={ onChangeQuantityHandler, updateQuantityOfBagsincart }
                      options={ quantityDataArray }
                      styles={ reactSelectDropdownStyles }
                    />
                  </div>

                </div>
              </div>
              <div className='form-group row  align-items-center'>
                <label className='col-sm-4 col-3 cmp-cart-order-details-dropdown-label'>{aemData.grindText}</label>
                <div className='col-sm-8 col-9'>
                  <div className='cmp-cart-order-details-dropdown-values fluid dropdown'>
                    <Select className='react-select-container' classNamePrefix='react-select'
                      value={ selectedGrindOption }
                      onChange={ onChangeGrindHandler, updateGrindincart }
                      options={ grindDataArray }
                      styles={ reactSelectDropdownStyles }
                    />
                  </div>
                </div>
              </div>
              <div className='form-group row  align-items-center'>
                <div className='col-sm-12 offset-sm-4'>
                  <div className='cartwrapper__order-item-price text-right'>
                    { productQuantity } x { productPriceCurrencyCode ==='USD' ? '$' : productPriceCurrencyCode }{ productPrice }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='single-sub-total'>
        <div className='row'>
          <div className='col-md-5 offset-md-7'>
            <div className='cartwrapper__order-item-price-shipping'>            
            { !shippingCost ? <Fragment> 
                <ul className='cartwrapper__order-item-price-shipping--ul'>
                  <li className='cartwrapper__order-item-price-shipping--li'>Shipping</li>
                  <li className='cartwrapper__order-item-price-shipping--li info'>Calculated in checkout</li>
                </ul>
              </Fragment> : null }
              <ul className='cartwrapper__order-item-price-shipping--ul'>
                <li className='cartwrapper__order-item-price-shipping--li'>Sub Total</li>
                <li className='cartwrapper__order-item-price-shipping--li'>{ productPriceCurrencyCode ==='USD' ? '$' : productPriceCurrencyCode }{ productTotalPrice }</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );

};