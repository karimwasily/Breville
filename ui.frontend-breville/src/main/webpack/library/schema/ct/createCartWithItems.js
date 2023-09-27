export const createCartWithItemsMutation = `
  mutation ($draft: MyCartDraft!) {
    createMyCart(draft: $draft) {
      id
      version
      lineItems {
        id
        variant {
          key
          sku
          attributesRaw {
            name
            value
          }
        }
      }
    }
  }
`;

/*
{ draft: { currency: 'USD', country: 'US',
  taxMode: 'Platform',
  lineItems: [
    {
      sku: '<<dynamic bundle variant sku>>',
      quantity: 1,
      supplyChannel: {
        typeId: 'channel',
        key: 'breville-web-us'
      },
      distributionChannel: {
        typeId: 'channel',
        key: 'breville-web-us'
      }
    },
    {
      sku: '<<<Finished goods sku as in dynamic bundle product finishedGoodsSKU attribute>>',
      quantity: 1,
      custom: {
        typeKey: 'lineitemoption',
        fields: [
          {
            name: 'parent_dynamic_bundle',
            value: '"<<dynamic bundle variant sku>>"'
          }, {
            name: 'is_part_of_dynamic_bundle',
            value: 'true'
          }
        ]
      },
      supplyChannel: {
        typeId: 'channel',
        key: 'breville-web-us'
      },
      distributionChannel: {
        typeId: 'channel',
        key: 'breville-web-us'
      }
    },
    {
      sku: '<<Beans SKU>>',
      quantity: 1,
      custom: {
        typeKey: 'lineitemoption',
        fields: [
          {
            name: 'parent_dynamic_bundle',
            value: '"<<dynamic bundle variant sku>>"'
          }, {
            name: 'is_part_of_dynamic_bundle',
            value: 'true'
          },
          {
            name: 'Grind',
            value: '"test"'
          },
          {
            name: 'Subscription_plan_id',
            value: '"PLAN_WEEKLY_2"'
          }
        ]
      },
      supplyChannel: {
        typeId: 'channel',
        key: 'breville-web-us'
      },
      distributionChannel: {
        typeId: 'channel',
        key: 'breville-web-us'
      }
    }
  ]
}
};
*/