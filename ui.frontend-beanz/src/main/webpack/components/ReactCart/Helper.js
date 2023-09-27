export function displaySubscriptionName( subscriptionName ) {
  let displayName, displayNumber;
  if ( subscriptionName ){
    if ( subscriptionName.includes( 'WEEK' ) ) {
      displayNumber = subscriptionName.split( '_' )[3];
      if ( displayNumber === '1' ) {
        displayName = `${ displayNumber } Week`;
      }
      else {
        displayName = `${ displayNumber } Weeks`;
      }
    }
    else if ( subscriptionName.includes( 'MONTH' ) ) {
      displayNumber = subscriptionName.split( '_' )[3];
      if ( displayNumber === '1' ) {
        displayName = `${ displayNumber } Month`;
      }
      else {
        displayName = `${ displayNumber } Months`;
      }
    }
    else {
      displayName = ' Just One Time';
    }
    return displayName;
  }
}