import React from 'react';
import { func, node } from 'prop-types';
import CloseIconButton from 'components/shared-ui/CloseIconButton';
import { useTranslation } from 'react-i18next';


const RemoveAccountTemplate = ( { content, onCloseModal } ) => {

  const { t } = useTranslation();

  return (
    <div className='remove-account__container'>
      <div className='remove-account__header'>
        <div className='remove-account__title'>{ t( 'eh-text-delete-account' ) }</div>
        <CloseIconButton onClick={ onCloseModal } className='remove-account__close-icon' size='large' />
      </div>
      <div className='remove-account__content'>
        { content }
      </div>
    </div>

  );
};

RemoveAccountTemplate.propTypes = {
  onCloseModal: func,
  content: node
};


export default RemoveAccountTemplate;