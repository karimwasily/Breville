import React from 'react';
import { useDispatch } from 'react-redux';
import Button from 'xps-react/core/button';
import { useTranslation } from 'react-i18next';
import { object } from 'prop-types';
import { updateUserAddress } from 'library/store/mybreville/actions';

const SavedAddressesTile = ( { address: sfdcAddress } ) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const addressId = sfdcAddress.Id,
    isDefault = sfdcAddress.isDefault,
    addressName = sfdcAddress.Name || '',
    addressLine = [sfdcAddress.Shipping_Street_Line_1__c || '', sfdcAddress.Shipping_Street_Line_2__c || ''].filter( Boolean ).join( ' ' ),
    country = sfdcAddress?.Country || '',
    city = sfdcAddress?.City || '',
    state = sfdcAddress?.State || '',
    postal = sfdcAddress?.PostalCode || '',
    phone = sfdcAddress?.Phone || '';

  function handleSetDefaultClick() {
    const formAddressObj = {
      addressId,
      firstName: '',
      lastName: addressName,
      address1: sfdcAddress.Shipping_Street_Line_1__c,
      address2: sfdcAddress.Shipping_Street_Line_2__c,
      country,
      city,
      state,
      zipCode: postal,
      phone,
      isDefault: true
    };

    if ( formAddressObj?.addressId ) {
      dispatch( updateUserAddress( {
        data: formAddressObj
      } ) );
    }
  }

  return (
    <div id={ `address-${ addressId }` } className={ `cmp-mybreville__address-tile ${ isDefault ? 'default-tile' : '' }` }>
      <div className='cmp-mybreville__address-text'>
        <div className='cmp-text'>
          <p>{ addressName }</p>
          <p>{ addressLine }</p>
          <p>{ [city, state, postal].join( ' ' ) }</p>
          <p>{ country }</p>
          <p>{ phone }</p>
        </div>
        <div className='edit-buttons'>
          <Button
            disabled={ false }
            href={ `/account-details/saved-addresses/${ addressId }` }
            className='link'
            children={ t( 'eh-button-edit' ) }
            type='link'
          />
          <div className={ `default  ${ isDefault ? 'cmp-mybreville__address-tile-default' : '' }` }>
            <p className='cmp-mybreville__address-default'>{ t( 'eh-text-default' ) }</p>
          </div>
          { !isDefault &&
            <div className='set-default'>
              <Button
                disabled={ false }
                href=''
                className='link'
                children={ t( 'eh-button-set-default' ) }
                type='link'
                onClick={ handleSetDefaultClick }
              />
            </div>
            }
        </div>
      </div>
    </div>
  );
};

SavedAddressesTile.propTypes = {
  address: object.isRequired
};

export default SavedAddressesTile;