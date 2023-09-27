import React, { useState } from 'react';
import { node, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import RemoveAccountTemplate from './remove-account-template';
import Modal from 'react-modal';

const RemoveAccount = ( { children, className, linkClassName } ) => {
  const [isModalOpen, setIsModalOpen] = useState( false );
  const { t } = useTranslation();

  function openModal() {
    setIsModalOpen( true );
  }

  function closeModal() {
    setIsModalOpen( false );
  }

  return (
    <div className={ className }>
      <span
        onClick={ openModal }
        onKeyDown={ openModal }
        className={ classNames( 'remove-account__modal-link', linkClassName ) }
        role='button'
        tabIndex={ 0 }
      >
        { t( 'eh-text-delete-account' ) }
      </span>
      <Modal
        isOpen={ isModalOpen }
        contentLabel='Remove Account Content'
        onRequestClose={ closeModal }
        className='remove-account__modal'
        overlayClassName='remove-account__overlay'
      >
        <RemoveAccountTemplate onCloseModal={ closeModal } content={ children } />
      </Modal>
    </div>
  );
};

RemoveAccount.propTypes = {
  children: node.isRequired,
  className: string,
  linkClassName: string
};

export default RemoveAccount;
