import React, { useRef, forwardRef } from 'react';
import Slider from 'xps-react/core/react-slick';
import { array, func } from 'prop-types';
import TutorialsTiles from '../../mybreville/components/tutorials-tiles';
import { BREAKPOINT_XL } from '../../../../library/constants';

const TutorialsCarousel = forwardRef( ( { playlistData, onChange, handleOpenVideo }, ref ) => {

  const sliderSettings = {
    adaptiveHeight: false,
    arrows: false,
    beforeChange: onChange,
    className: 'playlist__slide',
    dots: false,
    draggable: false,
    fade: false,
    infinite: false,
    rows: 1,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipe: false,
    swipeToSlide: false,
    speed: 300,
    variableWidth: true,
    responsive: [
      {
        breakpoint: BREAKPOINT_XL,
        settings: {
          draggable: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          swipe: true,
          swipeToSlide: true,
          speed: 0
        }
      }
    ]
  };

  // Next three chunks are To prevent click event triggering when swiping the carousel
  const state = useRef( { x: 0 } );

  function handleMouseDown( event ){
    state.current.x = event.screenX;
  }

  function handleWrapper( videoId ) {
    return ( event ) => {
      const delta = Math.abs( event.screenX - state.current.x );
      return delta > 10 ? () => void 0 : handleOpenVideo( videoId );
    };
  }

  return (
    <Slider ref={ ref } { ...sliderSettings }>
      {
        playlistData.map( ( item, index ) => {
          const { video: [videoId = ''] } = item;
          return (
            <div
              className='product-tutorial'
              key={ index }
              onClick={ handleWrapper( videoId ) }
              onKeyPress={ handleWrapper( videoId ) }
              onMouseDown={ handleMouseDown }
              role='button'
              tabIndex='0'
            >
              <TutorialsTiles tileData={ item } />
            </div> );
          } )
      }
    </Slider>
  );
} );

TutorialsCarousel.defaultProps = {
  playlistData: [],
  onChange: () => void 0,
  handleOpenVideo: () => void 0
};

TutorialsCarousel.propTypes = {
  playlistData: array,
  onChange: func,
  handleOpenVideo: func
};

export default TutorialsCarousel;
