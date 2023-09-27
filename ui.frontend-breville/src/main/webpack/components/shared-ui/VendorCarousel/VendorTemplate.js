import React, { useState } from 'react';
import { func } from 'prop-types';
import CloseIconButton from 'components/shared-ui/CloseIconButton';
import { Image } from 'components/shared-ui/image';

const VendorTemplate = ( { onCloseModal, handleModalClick, activeBrand, brandImgs, brandImgAlts = [] } ) => {

  function onCickHandler( e ) {
    const brandIndex = e.target.getAttribute( 'data-index' );
    handleModalClick( brandIndex );
  }

  return (
    <div className='vendor-modal__container'>
      <div className='vendor-modal-header'>
        <h1 className='vendor-modal-header__title'>Select a Roaster</h1>
        <CloseIconButton onClick={ onCloseModal } className='vendor-modal__close-icon' size='large' />
      </div>
      <div className='vendor-modal-content'>
        <div className='react-flex'>
          {
            brandImgs && brandImgs.map( ( brand, index ) => {
                return <Image
                  key={ index }
                  data-index={ index }
                  alt={ brandImgAlts[index] || '' }
                  src={ brand }
                  className={ `carousel-item__item ${ activeBrand === index ? 'is-active' : '' }` }
                  onClick={ onCickHandler }
                />;
            } )
          }
        </div>
      </div>
    </div>
  );
};

VendorTemplate.propTypes = {
  onCloseModal: func
};

export default VendorTemplate;