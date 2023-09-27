import React from 'react';
import { object } from 'prop-types';

const AddressEntry = ( { address: sfdcAddress } ) => {
  const addressId = sfdcAddress.Id,
    isDefault = sfdcAddress.isDefault,
    addressName = sfdcAddress.Name || '',
    addressLine = [sfdcAddress.Shipping_Street_Line_1__c || '', sfdcAddress.Shipping_Street_Line_2__c || ''].filter( Boolean ).join( ' ' ),
    city = sfdcAddress?.City || '',
    state = sfdcAddress?.State || '',
    postal = sfdcAddress?.PostalCode || '',
    country = sfdcAddress?.Country || '',
    phone = sfdcAddress?.Phone || '';

  return (
    <div id={ `address-${ addressId }` } className={ `cmp-mybreville__address-tile ${ ( isDefault ? 'cmp-mybreville__address-tile-default' : '' ) }` }>
      <div className='cmp-mybreville__address-text'>
        <p className='cmp-mybreville__address-default'>Default</p>
        <p>{ addressName }</p>
        <p>{ addressLine }</p>
        <p>{ [city, state, postal].join( ' ' ) }</p>
        <p>{ country }</p>
        <p>{ phone }</p>
      </div>
    </div>
  );
};

AddressEntry.propTypes = {
  address: object.isRequired
};

export default AddressEntry;