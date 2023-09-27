import userSchema from 'library/schema/users';
import { configuration } from 'xps-utils/configuration';
const configurationData = configuration();
class Services {
  constructor() {
    if ( !Services.instance ) {
      Services.instance = this;
    }
    this.params = {};
    return Services.instance;
  }

  set setParams( params ) {
    this.params = params;
  }
  getService( name ) {
    let domain;
    if ( configurationData?.awsApiUrl ){
      domain = configurationData.awsApiUrl;
    }

    const service = {

      getUser: {
        method: 'post',
        baseURL: `${ domain }/api`,
        withCredentials: false, // if true will pass all cookies
        query: userSchema.query
      },
      mergeCart: {
        method: 'post',
        baseURL: `${ domain }/authenticate/createcustomer`
      },
      createUser: {
        method: 'post',
        baseURL: `${ domain }/api`,
        withCredentials: false,
        mutation: userSchema.mutation
      },
      createEmptyCart: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.CreateEmptycartmutation
      },
      UpdateCart: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.UpdateCartmutation
      },
      CheckPriceAndAvailability: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.PriceandAvailablilityMutation
      },
      GoToCartService: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.GoToCart
      },
      GetCartVersionService: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.GetCartVersion
      },
      GetPaymentVersion: {
        method: 'post',
        baseURL: `${domain}/commercetools/graphql`,
        mutation: userSchema.GetPaymentVersion
      },
      GetAnonymousToken: {
        method: 'post',
        baseURL: `${ domain }/commercetools/oauth/anonymous`
      },
      Payment: {
        method: 'post',
        baseURL: `${ domain }/commercetools/payments`
      },
      GetProductbySkuService: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.GetProductbySku
      },
      deleteLineItemfromCart: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.deleteLineItemQuery
      },
      applyPromoCodeService: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.promoCodeQuery
      },
      removePromoCodeService: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.promoCodeQuery
      },
      orderCreateService: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.CreateOrder
      },
      orderDetailsService: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.GetOrderDetails
      },
      setShippingMethod: {
        method: 'post',
        baseURL: `${ domain }/commercetools/graphql`,
        withCredentials: false,
        mutation: userSchema.SetShipingMethod
      },
      mock: {
        method: 'get',
        params: {}, // do not include any default params
        baseURL: `${ domain }/mock`,
        interceptors: {
          response: {
            success: ( response ) => {
              // logic here
            },
            error: ( error ) => {
              // logic here
            }
          }
        }
      },
      /***
       * *** Subscription APIs
       */
      viewSubscriptionService: {
        method: 'get',
        baseURL: `${ domain }/subscription/viewsubscription`
      },

      viewOrderService: {
        method: 'get',
        baseURL: `${domain}/customers/orders`,
      },

      pauseNextdatesService: {
        method: 'get',
        baseURL: `${ domain }/subscription/pausenextdropdates`
      },

      pauseSubscriptionService: {
        method: 'post',
        baseURL: `${ domain }/subscription/pauseandresume`
      },

      resumeSubscriptionService: {
        method: 'post',
        baseURL: `${ domain }/subscription/pauseandresume`,
        params: {}
      },

      cancelSubscriptionService: {
        method: 'post',
        baseURL: `${ domain }/subscription/cancelsubscription`,
        params: {}
      },

      changeCoffee: {
        method: 'post',
        baseURL: `${domain}/subscription/editsubscription`,
      },

      viewOrderService: {
        method: 'get',
        baseURL: `${domain}/customers/orders?brand=beanz`,
        params: {},
      },

      getAccountDetailsService: {
        method: 'get',
        baseURL: `${ domain }/customers/account`,
        params: {}
      },
      updateAccountAddressService: {
        method: 'patch',
        baseURL: `${ domain }/customers/account`,
        params: {}
      },
      addAlternateShippingAddressService: {
        method: 'post',
        baseURL: `${ domain }/customers/alt-address`,
        params: {}
      },
      updateAlternateShippingAddressService: {
        method: 'patch',
        baseURL: `${ domain }/customers/alt-address`,
        params: {}
      },
      setDefaultShippingAddressService: {
        method: 'patch',
        baseURL: `${ domain }/customers/account`,
        params: {}
      }
    };
    return service[name];
  }


}
export default new Services();
