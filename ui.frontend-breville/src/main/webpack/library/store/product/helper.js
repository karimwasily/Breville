/**
 * graphql variable data for update cart request
 * @param {object} args args
 * @param {string} args.sku sku of the dyn bun variant
 * @param {number} [args.quantity] quantity
 * @param {string} args.coffeeSubscriptionSKU sku of the beanz subscription
 * @param {string} args.cartID cart ID (4b46c5f6-7106-475b-8dd0-a3d502d23cec)
 * @param {string} args.cartVersion cart version (5)
 * @param {string} args.country country code (US)
 * @param {string} args.locale locale region (en-US)
 * @param {string} args.webchannel webchannel (breville-web-us)
 * @param {string} args.warrantySKU SKU for Mulberry Warranty (EW4YRNW450)
 * @returns {object}
 */

export const updateCartLineItemVars = ( { sku, quantity = 1, cartID, cartVersion, country, locale, webchannel, warrantySKU } ) => {
  const payload = {
    id: cartID,
    version: cartVersion,
    locale,
    shippingAddress: {
      country
    },
    billingAddress: {
      country
    },
    actions: [
      {
        addLineItem: {
          sku: sku,
          quantity,
          supplyChannel: {
            typeId: 'channel',
            key: webchannel
          },
          distributionChannel: {
            typeId: 'channel',
            key: webchannel
          }
        }
      }
    ]
  };

  // Conditionally add warranty if selected
  if ( warrantySKU ) {
    payload.actions[0].addLineItem['custom'] = {
      typeKey: 'lineitemoption',
      fields: [
        {
          name: 'Extended_warranty',
          value: JSON.stringify( warrantySKU )
        }
      ]
    };
  }

  return payload;
};
