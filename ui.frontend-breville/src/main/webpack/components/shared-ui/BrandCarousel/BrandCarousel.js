import React, { useEffect } from 'react';
import Slider from 'xps-react/core/react-slick';
import { array, func } from 'prop-types';
import { Image } from 'components/shared-ui/image';

/** @type {import('react-slick').Settings} - sliderSettings */
const sliderSettings = {
  arrows: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 7,
  lazyLoad: true,
  centerMode: true,
  centerPadding: 0,
  adaptiveHeight: false,
  // useCenterPaddingRatio: false,
  focusOnSelect: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

// todo: support image alt
/**
 * brand carousel component
 * @param {{brandImgs: string[], brandImgAlts: string[], onChange: function}} props props
 * @returns {React.ReactElement}
 */
export const BrandCarousel = ( { brandImgs, brandImgAlts = [], onChange } ) => {

  // auto trigger select first brand on mount
  useEffect( () => {
    onChange( 0 );
  }, [] );

  return (
    <div className='brandcarousel'>
      <Slider afterChange={ onChange } { ...sliderSettings }>
        { brandImgs.map( ( brandImg, idx ) => {
                return (
                  <button key={ idx } className='carousel-item__wrapper'>
                    <Image
                      alt={ brandImgAlts[idx] || '' }
                      src={ brandImg }
                      className='carousel-item__item'
                    />
                  </button>
                );
            } ) }
      </Slider>
    </div>
  );
};

BrandCarousel.propTypes = {
  brandImgs: array,
  brandImgAlts: array,
  onChange: func
};