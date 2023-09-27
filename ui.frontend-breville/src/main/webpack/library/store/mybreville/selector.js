import { createSelector } from 'reselect';
import { SLICE_NAME, EMPTY_USER_LAST_NAMES } from './constant';

/**
 * Gets the sub-state slice from the store
 * @param {object} state global state
 * @returns {object} sub-state slice
 */
export const getStateSlice = ( state = {} ) => state[SLICE_NAME] || {};

// memoized selector of the sub-state slice
export const selectState = createSelector( getStateSlice, ( state ) => state );

export const selectIsLoading = createSelector( selectState, ( state )=> state.isLoading );

export const selectFetch = createSelector( selectState, ( state )=> state.fetched );

export const selectIsError = createSelector( selectState, ( state )=> state.errorFlag );

export const selectAemData = createSelector( selectState, ( state )=> state?.aemData );

export const selectUserDetail = createSelector( selectState, ( state )=> state?.userDetail );

export const selectUserId = createSelector( selectUserDetail, ( state )=> state?.Id );

/**
 * Get all the addresses that user has registered with user account
 * If the user is not authenticated, this will return `null`
 * Otherwise if the user is authenticated, this will return an array of addresses
 * @returns {ContactPointAddresses[]} If user is authenticated - Zero or more `ContactPointAddresses`
 * @returns {null} If user is not authenticated - `null`
 */
export const selectAddresses = createSelector( selectUserDetail, ( userDetailState ) => {
  const addresses = [];

  if ( userDetailState ) {
    const defaultContactPointAddress = {
      Id: 'default',
      ParentId: userDetailState.Id,
      Name: userDetailState.Name,
      AddressType: 'Shipping',
      Street: userDetailState?.ShippingStreet || '',
      Shipping_Street_Line_1__c: userDetailState?.Shipping_Street_Line_1__c || '',
      Shipping_Street_Line_2__c: userDetailState?.Shipping_Street_Line_2__c || '',
      Country: userDetailState?.ShippingCountryCode,
      City: userDetailState?.ShippingCity || '',
      State: userDetailState?.ShippingStateCode || '',
      PostalCode: userDetailState?.ShippingPostalCode || '',
      isDefault: true
    };

    addresses.push( defaultContactPointAddress );

    if ( userDetailState?.ContactPointAddresses?.records?.length ) {
      addresses.push( ...userDetailState.ContactPointAddresses.records );
    }
  }

  return addresses;
} );

/**
 * Find an address by id for current user
 * @param {string} addressId A string representation for the address ID
 * @returns {Function<ContactPointAddress>} ContactPointAddress
 */
export const selectAddressById = ( addressId ) => createSelector( selectAddresses, ( addresses )=> addresses && addresses.find( ( elem ) => elem.Id === addressId ) );

export const selectOrders = createSelector( selectState, ( state )=> state.userOrders );

/**
 * Find an orrder by order number for current user
 * @param {string} orderId A string representation for the order number
 * @returns {Function<ContactPointAddress>} ContactPointAddress
 */
export const selectOrderById = ( orderId ) => createSelector( selectOrders, ( orders )=> orders && orders.find( ( elem ) => elem.OrderNumber === orderId ) );

export const selectDerivedUserDetail = createSelector(
  selectUserDetail,
  ( state ) => {
    return {
      ...state,
      FirstName: state?.FirstName === null ? '' : state?.FirstName,
      LastName: EMPTY_USER_LAST_NAMES.includes( state?.LastName ) ? '' : state?.LastName
    };
  }
);

/**
 * Get country state list that's prepopulated by AEM
 * @see {@link https://breville.atlassian.net/browse/EH-908}
 */
export const selectCountryStateList = createSelector( selectAemData, ( aemData )=> aemData?.countryState || [] );

export const selectNotificationText = createSelector( selectState, ( state )=> state?.notifcationText );
export const selectMasterClasses = createSelector( selectState, ( state )=> state?.masterClasses );
export const selectMySubscriptions = createSelector( selectState, ( state )=> state?.mySubscriptions );
export const selectMySubscriptionsPauseDropdown = createSelector( selectState, ( state )=> state?.pausedDates?.NextOrders );

/**
 * Find a subscription by id for current user
 * @param {string} subscriptionId A string representation for the address ID
 * @returns {Function<ContactPointAddress>} ContactPointAddress
 */
export const selectSubscriptionById = ( subscriptionId ) => createSelector( selectMySubscriptions, ( subscriptions )=> subscriptions && subscriptions.find( ( elem ) => elem?.standingorderid === parseInt( subscriptionId ) ) );


export const selectUserProducts = createSelector( selectState, ( state )=> state?.userProducts || [] );

export const selectGeneralAemData = createSelector( selectAemData, ( aemData )=> aemData?.aemData?.general || {} );
export const selectMyBrevilleAemData = createSelector( selectAemData, ( aemData )=> aemData?.aemData?.myBreville || {} );
export const selectMySubscriptionAemData = createSelector( selectAemData, ( aemData )=> aemData?.aemData?.mySubscription || {} );
