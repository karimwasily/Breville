import React, { useEffect, useState, useRef, createRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Button } from 'xps-react/core';
import { Image } from 'components/shared-ui/image';
import { array, func, object, number } from 'prop-types';
import classNames from 'classnames';

export const ShowcaseListCarousel = ( { showcaseItems, onChange, currentItem, currentItemIndex, customSliderSettings = {} } ) => {

  const sliderSettings = {
    pagination: false,
    arrows: false,
    perPage: showcaseItems.length,
    easing: 'linear',
    direction: 'ttb',
    height: 200,
    width: '100%',
    ...customSliderSettings
  };

  const splideRef = createRef();

  function onItemClick( splide, element ) {

    const currentIndex = element.index;

    onChange && onChange( {
      currentItem: showcaseItems[currentIndex],
      currentItemIndex: currentIndex
    } );
    splide.go( currentIndex );
  }

  return (
    <div className='cmp-showcase-carousel'>
      <Splide options={ sliderSettings } onClick={ onItemClick } ref={ splideRef }>
        { showcaseItems.map( ( elem, idx ) => {
          const { productName } = elem;
          return (
            <SplideSlide key={ idx }>
              <Button className={ classNames( { activeSlideItem: currentItemIndex === idx } ) } size='small' colorScheme='none' >
                <p className='cmp-title'>{ productName }</p>
              </Button>
            </SplideSlide>
          );
        } ) }
      </Splide>
    </div>
  );
};

export const ShowcaseImageCarousel = ( { showcaseItems, onChange, currentItemIndex, customSliderSettings = {} } ) => {

  const splideRef = createRef();

  const sliderSettings = {
    type: 'loop',
    padding: 0,
    perPage: 1,
    perMove: 1,
    focus: 'center',
    pagination: false,
    speed: 500,
    ...customSliderSettings
  };

  useEffect( () => {
    splideRef.current.splide.go( currentItemIndex );
    onChange && onChange( {
      currentItem: showcaseItems[currentItemIndex],
      currentItemIndex: currentItemIndex
    } );
  }, [currentItemIndex] );

  function handleSlideMoved( splide, prev, next ) {
    onChange && onChange( {
      currentItem: showcaseItems[splide.index],
      currentItemIndex: splide.index
    } );
  }

  return (
    <div className='showcase__carousel'>
      <Splide ref={ splideRef } options={ sliderSettings } onMoved={ handleSlideMoved }>
        { showcaseItems.map( ( elem, idx ) => {
          const { sku, imgAlt, pdp_image: pdpImage } = elem;
          return (
            <SplideSlide className='cmp-image' key={ idx } itemType='http://schema.org/ImageObject'>
              <Image
                alt={ imgAlt }
                src={ pdpImage }
                className='cmp-image__image'
              />
            </SplideSlide>
          );
        } ) }
      </Splide>
    </div>
  );
};

ShowcaseListCarousel.propTypes = {
  showcaseItems: array,
  onChange: func,
  currentItem: object,
  currentItemIndex: number,
  customSliderSettings: object
};

ShowcaseImageCarousel.propTypes = {
  showcaseItems: array,
  onChange: func,
  currentItem: object,
  currentItemIndex: number,
  customSliderSettings: object
};
