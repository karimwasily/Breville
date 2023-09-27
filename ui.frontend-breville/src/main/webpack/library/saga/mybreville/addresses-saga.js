import { call, put, select } from 'redux-saga/effects';
import { addNewAddressService, updateAddressService, deleteAddressService, updateUserDetailService } from 'library/store/mybreville/service-request';
import { pageLoading } from 'library/store/ui/actions';
import { selectUserDetail } from 'library/store/mybreville/selector';
import { setUserDetail, setError } from 'library/store/mybreville/actions';

/**
 * @typedef {Object} AddressObject
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} address1
 * @property {string} address2
 * @property {string} country
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 */

/**
 * @typedef {Object} ContactPointAddress
 * @property {string} ParentId - AccountID of the customer
 * @property {string} Id
 * @property {string} Name
 * @property {string} AddressType
 * @property {string} Street
 * @property {string} Shipping_Street_Line_1__c
 * @property {string} Shipping_Street_Line_2__c
 * @property {string} Country
 * @property {string} City
 * @property {string} State
 * @property {string} PostalCode
 * @property {boolean} isDefault
 * @docs https://breville.atlassian.net/wiki/spaces/ER/pages/1604453421/Insert+alternate+address
 */

/**
 * Maps AddressObject to SF model ContactPointAddress
 * @param {AddressObject} payload AddressObject
 * @param {object} userData UserObject
 * @param {boolean} isDefault Specify if this will be the default address
 * @returns {ContactPointAddress} ContactPointAddress
 */
const mapPayloadToSFAddress = ( payload, { Id, Name } ) => {
  const ContactPointAddress = {
    ParentId: Id,
    Name,
    /**
     * AddressType is currently hardcoded as this is a mono-value
     * TODO! Discuss if we need interface for this
     */
    AddressType: 'Shipping',
    Street: '',
    Shipping_Street_Line_1__c: payload?.address1 || '',
    Shipping_Street_Line_2__c: payload?.address2 || '',
    Country: payload?.country,
    City: payload?.city || '',
    State: payload?.state || '',
    PostalCode: payload?.zipCode || '',
    isDefault: !!payload?.isDefault || false
  };

  /** Concat streetLine1 with streetLine2 and rejoice as a Street */
  ContactPointAddress.Street = [ContactPointAddress.Shipping_Street_Line_1__c, ContactPointAddress.Shipping_Street_Line_2__c].filter( Boolean ).join( ' ' );

  /**
   * If payload already has an ID, assign it to the object
   * Which we currently use for RUD operation
   */
  if ( payload?.id ) {
    ContactPointAddress.Id = payload.id;
  }

  return ContactPointAddress;
};

const doSwapDefaultAddress = ( userData, newSfAddress ) => {
  const newUserAddressData = {
    ShippingStreet: newSfAddress.Street,
    Shipping_Street_Line_1__c: newSfAddress.Shipping_Street_Line_1__c,
    Shipping_Street_Line_2__c: newSfAddress.Shipping_Street_Line_2__c,
    ShippingCountryCode: newSfAddress.Country,
    ShippingCity: newSfAddress.City,
    ShippingStateCode: newSfAddress.State,
    ShippingPostalCode: newSfAddress.PostalCode
  };
  const newUserData = { ...userData };

  // Assign new address as default by assigning to newUserData
  Object.assign( newUserData, newUserAddressData );

  // Assign oldAddress in ContactPointAddresses from the one in userData
  if ( Array.isArray( newUserData?.ContactPointAddresses?.records ) ) {
    const currentAddresses = newUserData.ContactPointAddresses.records,
      addressIdx = currentAddresses.findIndex( ( elem ) => elem.Id === newSfAddress.Id );

    if ( addressIdx >= 0 ) {
      Object.assign( currentAddresses[addressIdx], {
        Street: userData?.ShippingStreet || '',
        Shipping_Street_Line_1__c: userData?.Shipping_Street_Line_1__c || '',
        Shipping_Street_Line_2__c: userData?.Shipping_Street_Line_2__c || '',
        Country: userData?.ShippingCountryCode,
        City: userData?.ShippingCity || '',
        State: userData?.ShippingStateCode || '',
        PostalCode: userData?.ShippingPostalCode || ''
      } );
    }
  }

  return newUserData;
};


/**
 * Add new alternate address
 * @param {responsiveAction} action contains "payload"
 * @docs https://breville.atlassian.net/wiki/spaces/ER/pages/1604453421/Insert+alternate+address
 */
export function* addNewAddress( action = {} ) {
  const { payload: { data, successCallback, failCallback } } = action;

  if ( !data ) {
    return;
  }

  try {
    yield put( pageLoading( true ) );

    const userData = yield select( selectUserDetail );

    const newSfAddress = mapPayloadToSFAddress( data, userData, false );

    const response = yield call( addNewAddressService, {
      data: newSfAddress
    } );

    /**
     * Push the new ContactPointAddress to userData.ContactPointAddresses.records
     */
    if ( response?.id ) {
      newSfAddress.Id = response.id;

      if ( Array.isArray( userData?.ContactPointAddresses?.records ) ) {
        userData.ContactPointAddresses.records.push( newSfAddress );
      }

      // Clones userData object so react state knows its re-render time
      const newUserData = { ...userData };

      // Update userData state
      yield put( setUserDetail( newUserData ) );
    }

    yield put( setError( false ) );
    yield put( pageLoading( false ) );


    if ( successCallback && typeof successCallback === 'function' ) {
      successCallback( {
        ...newSfAddress
      } );
    }
  }
  catch ( error ) {
    /**
     * TODO! Remove or log it to central logger which does not exist yet.
     */
    console.error( 'addAddress', error?.message );

    yield put( setError( true ) );
    yield put( pageLoading( false ) );


    /**
     * Run failCallback if it's provided by the action creator
     */
    if ( failCallback && typeof failCallback === 'function' ) {
      failCallback( error );
    }
  }
}

/**
 * Update existing address
 * @param {action} action contains "payload"
 */
export function* updateAddress( action = {} ) {
  const { payload: { data, successCallback, failCallback } } = action;

  if ( !data ) {
    return;
  }

  try {
    yield put( pageLoading( true ) );

    const userData = yield select( selectUserDetail );
    let newUserData = { ...userData };

    const newSfAddress = mapPayloadToSFAddress( data, newUserData, false );
    const isEditingDefaultAddress = data.addressId === 'default';

    if ( isEditingDefaultAddress ) {
      const newUserAddressData = {
        ShippingStreet: newSfAddress.Street,
        Shipping_Street_Line_1__c: newSfAddress.Shipping_Street_Line_1__c,
        Shipping_Street_Line_2__c: newSfAddress.Shipping_Street_Line_2__c,
        ShippingCountryCode: newSfAddress.Country,
        ShippingCity: newSfAddress.City,
        ShippingStateCode: newSfAddress.State,
        ShippingPostalCode: newSfAddress.PostalCode
      };

      yield call( updateUserDetailService, {
        url: newUserData.Id,
        data: newUserAddressData
      } );

      Object.assign( newUserData, newUserAddressData );

      // Update userData state
      yield put( setUserDetail( newUserData ) );
    }
    else {
      const isSettingToDefault = newSfAddress.isDefault;

      yield call( updateAddressService, {
        url: data.addressId,
        data: isSettingToDefault ? { isDefault: true } : newSfAddress
      } );

      // Set the addressId after the XHR call, because SFDC doesn't accept address id field in the body.
      newSfAddress.Id = data.addressId;

      if ( isSettingToDefault ) {
        /**
         * Sets one of the ContactPointAddress as a default address
         */
        newUserData = doSwapDefaultAddress( newUserData, newSfAddress );
      }
      else {
        /**
         * Updates details of one of the ContactPointAddress
         */
        if ( Array.isArray( newUserData?.ContactPointAddresses?.records ) ) {
          const currentAddresses = newUserData.ContactPointAddresses.records,
            addressIdx = currentAddresses.findIndex( ( elem ) => elem.Id === newSfAddress.Id );

          if ( addressIdx >= 0 ) {
            currentAddresses[addressIdx] = newSfAddress;
          }
        }
      }

      // Update userData state
      yield put( setUserDetail( newUserData ) );
    }

    yield put( setError( false ) );
    yield put( pageLoading( false ) );

    if ( successCallback && typeof successCallback === 'function' ) {
      successCallback( {
        ...newSfAddress
      } );
    }
  }
  catch ( error ) {
    /**
     * TODO! Remove or log it to central logger which does not exist yet.
     */
    console.error( 'updateAddress', error?.message );

    yield put( setError( true ) );
    yield put( pageLoading( false ) );

    /**
     * Run failCallback if it's provided by the action creator
     */
    if ( failCallback && typeof failCallback === 'function' ) {
      failCallback( error );
    }
  }
}

/**
 * Update existing address
 * @param {action} action contains "payload"
 */
export function* deleteAddress( action = {} ) {
  const { payload: { data, successCallback, failCallback } } = action;

  if ( !data ) {
    return;
  }

  try {
    yield put( pageLoading( true ) );

    const userData = yield select( selectUserDetail );

    const newSfAddress = mapPayloadToSFAddress( data, userData, false );

    const response = yield call( deleteAddressService, {
      url: data.addressId,
      data: newSfAddress
    } );

    /**
     * Deletes the removed ContactPointAddress to existing userData.ContactPointAddresses.records
     */
    if ( response?.AddressId ) {
      newSfAddress.Id = response.AddressId;

      if ( Array.isArray( userData?.ContactPointAddresses?.records ) ) {
        const oldAddressIdx = userData.ContactPointAddresses.records.findIndex( ( elem ) => elem.Id === newSfAddress.Id );

        if ( oldAddressIdx >= 0 ) {
          userData.ContactPointAddresses.records.splice( oldAddressIdx, 1 );

          // Clones userData object so react state knows its re-render time
          const newUserData = { ...userData };

          // Update userData state
          yield put( setUserDetail( newUserData ) );
        }
      }
    }

    yield put( setError( false ) );
    yield put( pageLoading( false ) );

    if ( successCallback && typeof successCallback === 'function' ) {
      successCallback( {
        ...newSfAddress
      } );
    }
  }
  catch ( error ) {
    /**
     * TODO! Remove or log it to central logger which does not exist yet.
     */
    console.error( 'deleteAddress', error?.message );

    yield put( setError( true ) );
    yield put( pageLoading( false ) );

    /**
     * Run failCallback if it's provided by the action creator
     */
    if ( failCallback && typeof failCallback === 'function' ) {
      failCallback( error );
    }
  }
}
