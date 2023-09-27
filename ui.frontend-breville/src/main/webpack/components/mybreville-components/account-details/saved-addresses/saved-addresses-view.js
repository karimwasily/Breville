import React from 'react';
import { string, array } from 'prop-types';
import { Link } from 'react-router-dom';
import AddressEntry from '../components/address-entry';

const MAX_ADDRESS_ENTRIES = 4;

const SavedAddressesView = ( { addresses, pagePath } ) => {
  const addressCount = addresses.length || 0;

  return (
    <div className='cmp-mybreville__addresses-view'>
      <Link className='cmp-mybreville__link' to={ pagePath }>
        Saved Addresses { `(${ addressCount })` }
      </Link>
      <div className='cmp-mybreville__address-tile-wrapper'>
        { addresses.slice( 0, MAX_ADDRESS_ENTRIES ).map( ( sfdcAddress, index ) => {
          return (
            <AddressEntry
              key={ index }
              address={ sfdcAddress }
            />
          );
        } ) }
      </div>
      <div className='cmp-mybreville__address-button-wrapper'>
        <Link className='cmp-mybreville__address-button' to={ pagePath }>
          { addressCount > 4 && <span className='cmp-mybreville__address-button-desktop'>+{ addressCount - 4 } more</span> }
          { addressCount > 1 && <span className='cmp-mybreville__address-button-mobile'>+{ addressCount - 1 } more</span> }
        </Link>
      </div>
    </div>
  );
};

SavedAddressesView.defaultProps = {
  addresses: []
};

SavedAddressesView.propTypes = {
  addresses: array.isRequired,
  pagePath: string
};

export default SavedAddressesView;
