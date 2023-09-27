import React, { useState } from 'react';
import { func, string, array, object } from 'prop-types';
import { AlgoliaCoffeeProductTile } from 'components/shared-ui/CoffeeProductTile/AlgoliaCoffeeProductTile';
import { Flex } from 'shared-ui/Flex';
import { Button } from 'xps-react/core';
import Slider from 'xps-react/core/react-slick';

const WrapperComponent = ( { defaultSliderSettings, productsCount, children } ) => {
  return ( productsCount > 1 ) ? <Slider { ...defaultSliderSettings }>{ children }</Slider> : <div>{ children }</div>;
};

function ArrowLink( props ) {
  const { text, className, style, onClick, display } = props;

  function onKeyPressEvent( event ) {
    if ( event.code === 'Enter' || event.code === 'Space' ) {
      event.preventDefault();
      onClick( event );
    }
  }

  return (
    <div className={ className }>
      <Button
        style={{ ...style, display: display }}
        size='small'
        textType='bold'
        colorScheme='none'
        onClick={ onClick }
        onKeyPress={ onKeyPressEvent }
      >{ text }</Button>
    </div>
  );
}

export const BrandHeroContent = ( {
  handleProductSelect,
  selectedProduct,
  products,
  baristaChoiceFacet
} ) => {
  const [currentProductDetails, setCurrentProductDetails] = useState( products[0] );
  const [currentProductIndex, setCurrentProductIndex] = useState( 0 );
  const productsCount = products.length;

  const onChange = ( currentIdx ) => {
    const newIndex = products[currentIdx + 1] ? currentIdx + 1 : 0;
    setCurrentProductDetails( products[newIndex] );
    setCurrentProductIndex( newIndex );
  };

  const defaultSliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: false,
    centerPadding: 0,
    adaptiveHeight: false,
    autoplay: false,
    // fade: true,
    useCenterPaddingRatio: false,
    slidesToShowMobile: 1,
    slidesToShowTablet: 1,
    slidesToShowDesktop: 1,
    beforeChange: ( currentIdx ) => onChange( currentIdx ),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          nextArrow: <ArrowLink text='Show Me Another Great Match' className='next-arrow' display='block' />,
          prevArrow: <ArrowLink display='none' />
        }
      }
    ]
  };

  const sliderHandlers = {
    defaultSliderSettings: defaultSliderSettings,
    productsCount: productsCount,
    currentProduct: currentProductDetails,
    currentProductIndex: currentProductIndex
  };

  const currentBrand = products[currentProductIndex].brand;

  const backgroundImgStyles = {
    backgroundImage: `url(${ currentBrand.secondaryImg })`
  };

  return (
    <>
      <div className='cmp-brandcontent' style={ backgroundImgStyles }>
        <div className='cmp-brandcontent__content-wrapper'>
          <div className='cmp-brandcontent__info-content'>
            <div className='cmp-brandcontent__match-count'>
              Your Perfect Match{ productsCount > 1 && ` (${ currentProductIndex + 1 }/${ productsCount })` }:
            </div>
            { /* brand roaster image */ }
            <div className='cmp-brandcontent__roaster-container'>
              <div className='cmp-brandcontent__roaster-logo'>
                <div className='cmp-image' itemType='http://schema.org/ImageObject'>
                  <img
                    src={ currentBrand.brandImg }
                    className='cmp-image__image'
                    itemProp='contentUrl'
                    alt=''
                    title=''
                  />
                </div>
              </div>
              <div className='cmp-brandcontent__roaster-info'>
                <p className='cmp-brandcontent__product-name'>{ currentProductDetails.productName }</p>
                <p className='cmp-brandcontent__roaster-name'>by { currentBrand.title }</p>
              </div>
            </div>
            { /* brand description */ }
            <div className='cmp-brandcontent__description'>{ currentBrand.description }</div>
          </div>
          <div className='cmp-brandcontent__product-info-content'>
            <WrapperComponent { ...sliderHandlers }>
              { products.map( ( productData, idx ) => {
              const { brand, ...product } = productData;

              // START: TODO: Remove these settings when facets available from Beanz
              if ( !product['vendorName'] ) product['vendorName'] = product.hasOwnProperty( 'Our_Roasters' ) ? product.Our_Roasters : '';
              if ( !product['WEB_ROASTLEVEL_en_US'] ) product['WEB_ROASTLEVEL_en_US'] = product.hasOwnProperty( 'The_Roast' ) ? product.The_Roast : '';
              if ( !product['WEB_FLAVOURNOTES_en_US'] ) {
                if ( product['WEB_ADDITIONALFLAVOURNOTE_en_US'] ) {
                  product['WEB_FLAVOURNOTES_en_US'] = product['WEB_ADDITIONALFLAVOURNOTE_en_US'];
                }
                else {
                  product['WEB_FLAVOURNOTES_en_US'] = product.hasOwnProperty( 'Coffee_Flavors' ) ? product.Coffee_Flavors : '';
                }
              }
              // END: TODO

              return (
                <div key={ idx } className='cmp-brandcontent__product-content'>
                  { /* Coffee tiles */ }
                  <div className='cmp-brandcontent__coffeetile'>
                    <AlgoliaCoffeeProductTile
                      key={ idx }
                      hit={ product }
                      showSelect
                      onSelect={ handleProductSelect }
                      isSelected={ product.objectID === selectedProduct?.objectID }
                      selectStyle='button'
                    />
                  </div>
                </div>
              );
            } ) }
            </WrapperComponent>
          </div>
        </div>

      </div>
    </>
  );
};

BrandHeroContent.propTypes = {
  logoImg: string,
  desc: string,
  descImg: string,
  products: array,
  handleProductSelect: func,
  selectedProduct: object
};
