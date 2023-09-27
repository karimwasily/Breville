import React from 'react';
import Button from 'shared-ui/button';
import { func, object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import CloseIconButton from 'components/shared-ui/CloseIconButton';

const RemoveAddressTemplate = ( { content, onCloseModal, onRemoveFn } ) => {
  const { t } = useTranslation();

  function doCloseModal() {
    onCloseModal();
  }

  function doRemoveAddress() {
    onRemoveFn();
  }

  return (
    <div className='remove-address__container'>
      <div className='remove-address__header'>
        <div className='remove-address__title'>{ t( 'eh-title-remove-address' ) }</div>
        <CloseIconButton onClick={ onCloseModal } className='remove-address__close-icon' size='large' />
      </div>
      <div className='remove-address__content'>
        { content }
      </div>
      <div className='remove-address__footer'>
        <div className='remove-address__button-wrapper'>
          <Button className='remove-address__button--cancel' onClick={ doCloseModal }>
            { t( 'eh-button-cancel' ) }
          </Button>
          <Button className='remove-address__button--remove' onClick={ doRemoveAddress }>
            { t( 'eh-button-remove' ) }
          </Button>
        </div>
      </div>
    </div>

  );
};

RemoveAddressTemplate.defaultProps = {
  onCloseModal: () => 0,
  onRemoveFn: () => 0
};

RemoveAddressTemplate.propTypes = {
  onCloseModal: func,
  onRemoveFn: func,
  content: object
};


export default RemoveAddressTemplate;