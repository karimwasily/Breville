import React from 'react';
import CloseIconButton from 'components/shared-ui/CloseIconButton';

export const ModalContentWrapper = ( { title, description, closeModal, customClasses = '' } ) => {
  return (
    <div className={ `cmp-complete-coffee-bundle__modal-content-wrapper ${ customClasses }` }>
      <div className='cmp-complete-coffee-bundle__modal-header'>
        <h4 className='cmp-complete-coffee-bundle__area-bundles-bundles-tiles-modal-title'>{ title }</h4>
        <CloseIconButton onClick={ closeModal } className='complete-bundle-modal__close-icon' size='large' />
      </div>
      <div className='cmp-complete-coffee-bundle__modal-content'>
        <div className='cmp-complete-coffee-bundle__area-bundles-bundles-tiles-modal-desc'>{ description }</div>
      </div>
    </div>
  );
};
