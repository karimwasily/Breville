/**
 * REACT CAROUSEL
 *
 * Extend via AEM Author dialog to provide json key values as a match to the 'react-slick' library documentation
 * There is a direct mapping of values so no updates to the react frontend code should be necessary
 *
 * @requires 'react-slick'
 * @see docs 'https://react-slick.neostack.com/docs/example/center-mode'
 */

import React from 'react';
import { object, any } from 'prop-types';
import Slider from 'xps-react/core/react-slick';
import { updateConfigViaCustomProps } from './carouselUtils';
import { withAem } from 'xps-utils/withAem';

/** @type {import('react-slick').Settings} - defaultSliderSettings */
const defaultSliderSettings = {
  className: '',
  // * use center mode when you want both prev & next slides to be slightly revealed
  // centerMode: true,
  // centerPadding: "60px",
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: false,
  fade: false,
  speed: 500,
  autoplay: false,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  swipeToSlide: true

  // responsive: [
  //   {
  //     breakpoint: 1024,
  //     settings: {
  //       slidesToShow: 3,
  //       slidesToScroll: 3,
  //       infinite: true,
  //       dots: true,
  //     },
  //   },
  //   {
  //     breakpoint: 600,
  //     settings: {
  //       slidesToShow: 2,
  //       slidesToScroll: 2,
  //       initialSlide: 2,
  //     },
  //   },
  //   {
  //     breakpoint: 480,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //     },
  //   },
  // ],
};

const ReactCarousel = ( { aemData, appRef } ) => {
  // passed in via AEM dialog
  // const sliderSettings = {
  //   dots: true,
  //   arrows: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   slidesToShowMobile: 1, << custom
  // };

  let sliderSettings = { ...defaultSliderSettings, ...aemData };

  // modifying passed config
  sliderSettings = updateConfigViaCustomProps( sliderSettings, appRef.current );

  return (
    <div id={ aemData?.id || 'cmp-react-carousel' }>
      { aemData && aemData.templateHTMLCollection && (
        <Slider { ...sliderSettings }>
          { [...aemData.templateHTMLCollection].map( ( slide, idx ) => {
            return (
              <div
                key={ idx }
                dangerouslySetInnerHTML={{ __html: slide.innerHTML }}
              ></div>
            );
          } ) }
        </Slider>
      ) }
    </div>
  );
};

ReactCarousel.propTypes = {
  aemData: object,
  appRef: any
};

export default withAem( ReactCarousel );
