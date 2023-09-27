import React, { useEffect, useState, createRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { array, func } from 'prop-types';
import { Image } from 'components/shared-ui/image';
import { Button } from 'xps-react/core';
import Modal from 'react-modal';
import VendorTemplate from './VendorTemplate';
import { keypressEnterSpace } from 'xps-utils/wcag/keypressEnterSpace';

const sliderSettings = {
  type: 'loop',
  padding: 0,
  perPage: 7,
  perMove: 7,
  focus: 'center',
  height: '85px',
  pagination: false,
  breakpoints: {
    // settings for screen size 575 and below
    575: {
      perPage: 1,
      perMove: 1,
      height: '75px'
    },
    // settings for screen size 767 and below
    767: {
      perPage: 3,
      perMove: 3
    },
    // settings for screen size 991 and below
    991: {
      perPage: 5,
      perMove: 5
    },
    // settings for screen size 1199 and below
    1199: {
      perPage: 7,
      perMove: 7
    }
  }
};

// todo: support image alt
/**
 * vendor carousel component
 * @param {{brandImgs: string[], brandImgAlts: string[], onChange: function}} props props
 * @returns {React.ReactElement}
 */
export const VendorCarousel = ( { brandImgs, brandImgAlts = [], onChange } ) => {

  const splideRef = createRef();

  const [showModal, setIsOpen] = useState( false );
  const [activeBrand, setActiveBrand] = useState( 0 );

  function openModal() {
    setIsOpen( true );
    setActiveBrand( splideRef.current.splide.index );
    document.getElementsByTagName( 'body' )[0].style.overflow = 'hidden';
  }

  function closeModal() {
    setIsOpen( false );
    document.getElementsByTagName( 'body' )[0].style.overflow = 'auto';
  }

  // auto trigger select first brand on mount
  useEffect( () => {
    onChange( 0 );
  }, [] );

  function onBrandChange( splide, prev, next ) {
    onChange( prev );
    setActiveBrand( splide.index );
  }

  function onBrandClick( splide, element ) {
    let newIndex = 0;
    if ( element.index >= 0 ) {
      newIndex = element.index < brandImgs.length ? element.index : element.index - brandImgs.length;
    }
    else {
      newIndex = element.index + brandImgs.length;
    }

    setActiveBrand( newIndex );

    onChange( newIndex );
    splide.go( element.index ); // passing back the original index to preserve the smooth movement of the slide
  }

  function handleModalClick( brandIndex = 0 ) {
    closeModal();
    setActiveBrand( splideRef.current.splide.index );
    splideRef.current.splide.go( brandIndex );
  }

  function onKeyPressEvent( event ) {
    keypressEnterSpace( event, openModal );
  }

  return (
    <div className='vendorcarousel'>
      <Splide options={ sliderSettings } onMoved= { onBrandChange } onClick={ onBrandClick } ref={ splideRef }>
        { brandImgs.map( ( brandImg, idx ) => {
          return (
            <SplideSlide key={ idx }>
              <Button className='carousel-item__wrapper' size='small' colorScheme='none'>
                <Image
                  alt={ brandImgAlts[idx] || '' }
                  src={ brandImg }
                  className='carousel-item__item'
                />
              </Button>
            </SplideSlide>
          );
        } ) }
      </Splide>
      <Button className='vendorcarousel-roaster-modal' onClick={ openModal } onKeyPress={ onKeyPressEvent } size='small' colorScheme='none'>Select a Roaster</Button>
      <Modal
        isOpen={ showModal }
        onRequestClose={ closeModal }
        className='modal-vendor'
        overlayClassName='overlay-vendor'
      >
        <VendorTemplate onCloseModal={ closeModal } brandImgs={ brandImgs } brandImgAlts={ brandImgAlts } handleModalClick={ handleModalClick } activeBrand={ activeBrand } />
      </Modal>
    </div>
  );
};

VendorCarousel.propTypes = {
  brandImgs: array,
  brandImgAlts: array,
  onChange: func
};