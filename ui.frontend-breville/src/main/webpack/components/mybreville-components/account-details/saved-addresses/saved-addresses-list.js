import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'xps-react/core/button';
import { useTranslation } from 'react-i18next';
import { selectAddresses } from 'library/store/mybreville/selector';
import SavedAddressesTile from './components/saved-addresses-tile.js';

const SavedAddressesList = () => {
  const addressList = useSelector( selectAddresses );
  const { t } = useTranslation();
  const sortedAddresses = ( addressList || [] ).sort( ( a, b ) => b.isDefault - a.isDefault ).map( ( sfdcAddress, idx ) => {
    return <SavedAddressesTile key={ idx } address={ sfdcAddress } />;
  } );

  return (
    <div className='cmp-mybreville__saved-addresses-list'>
      <div className='cmp-button'>
        <Button disabled={ false } href={ `/account-details/saved-addresses/new` }>
          { t( 'eh-button-add-new-address' ) }
        </Button>
      </div>
      <div className='cmp-mybreville__address-tile-wrapper'>{ sortedAddresses }</div>
    </div>
  );
};

SavedAddressesList.propTypes = {};

export default SavedAddressesList;
