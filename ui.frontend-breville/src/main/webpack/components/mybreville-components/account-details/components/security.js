import React from 'react';
import RemoveAccount from '../remove-account/remove-account';
import RemoveAccountContent from '../remove-account/remove-account-content';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { resetUserPassword, setNotificationText } from 'library/store/mybreville/actions';
import { useAuth0 } from '@auth0/auth0-react';

const Security = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user } = useAuth0();
  const isEmailSignin = user?.sub?.includes( 'auth0' );

  function setSuccessNotification() {
    dispatch( setNotificationText( t ( 'eh-message-password-change-success' ) ) );
  }

  function setFailureNotification() {
    dispatch( setNotificationText( t ( 'eh-message-password-change-failure' ) ) );
  }

  function onChangePasswordClick() {
    dispatch( resetUserPassword( {
      successCallback: setSuccessNotification,
      failCallback: setFailureNotification
    } ) );
  }

  return (
    <div className='cmp-mybreville__security'>
      <p className='cmp-mybreville__link'>{ t( 'eh-title-security' ) }</p>
      <div className='cmp-mybreville__links'>
        { isEmailSignin &&
        <div className='cmp-mybreville__linkbox'>
          <a href={ void 0 } className='cmp-mybreville__link' onClick={ onChangePasswordClick }>
            { t( 'eh-text-change-password' ) }
          </a>
        </div>
        }
        <RemoveAccount
          className='cmp-mybreville__linkbox'
          linkClassName='cmp-mybreville__link'
        >
          <RemoveAccountContent />
        </RemoveAccount>
      </div>
    </div>
  );
};

Security.propTypes = {};

export default Security;
