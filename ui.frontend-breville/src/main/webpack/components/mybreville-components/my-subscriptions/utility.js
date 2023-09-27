export function getSubscriptionFrequency( subscriptionData = {} ) {
  const { skucode: sku = '' } = subscriptionData;
  const [,, unit, interval] = sku.split( '_' );
  return {
    unit: ( unit || '' ).trim().toLowerCase(),
    interval: ( interval || '' ).trim().toLowerCase()
  };
}
