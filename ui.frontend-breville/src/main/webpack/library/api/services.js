import userSchema from 'library/schema/users';
import checkoutSchema from 'library/schema/checkout';
import { removeLineItemSchema, removeBundleSchema, updateQuantity, addBundleItem, addPromoCode, removePromoCode } from 'library/schema/cart';
import { CreateOrder } from 'library/schema/order';
import { productQuery } from 'library/schema/product';
import { configuration } from 'xps-utils/configuration';
const { awsApiUrl, auth0ApiDomain } = configuration();
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
    const baseDomainCT = `${ awsApiUrl }/commercetools`;
    const baseDomainCTGraphql = `${ baseDomainCT }/graphql`;
    const salesforceAPI = 'https://full-brevilleusa.cs79.force.com/reg/services/apexrest/NotifyMe';
    // todo: is this required? get dynamic value instead of hardcoded
    const paymentBaseAPI = 'https://n2g4j5epbk.execute-api.us-west-2.amazonaws.com/dev';
    const baseDomainSFDCCustomer = `${ awsApiUrl }/customers`;
    const baseDomainSubscription = `${ awsApiUrl }/subscription`;

    // todo: To be fixed Currently needed to unblock UAT beanz and breville orders
    const checkUATAPI = ( baseDomainSFDCCustomer === 'https://stage-api.foodthinkers.com/customers' );

    const service = {
      CTGraphqlService: {
        baseURL: baseDomainCTGraphql,
        withCredentials: false // if true will pass all cookies
      },
      CTRestService: {
        baseURL: baseDomainCT,
        withCredentials: false // if true will pass all cookies
      },
      salesforce: {
        baseURL: salesforceAPI,
        noBearer: true,
        withCredentials: false // if true will pass all cookies
      },
      getUser: {
        method: 'post',
        baseURL: `https://graphqlzero.almansi.me/api`,
        withCredentials: false, // if true will pass all cookies
        query: userSchema.query
      },
      getCart: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        withCredentials: false // if true will pass all cookies
      },
      removeLineItem: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        withCredentials: false, // if true will pass all cookies
        mutation: removeLineItemSchema
      },
      removeBundleItem: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        withCredentials: false, // if true will pass all cookies
        mutation: removeBundleSchema
      },
      updateQuantity: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        withCredentials: false, // if true will pass all cookies
        mutation: updateQuantity
      },
      addBundleItem: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        withCredentials: false,
        mutation: addBundleItem
      },
      getShippingMethods: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        withCredentials: false, // if true will pass all cookies
        query: checkoutSchema.getShippingMethods
      },
      updateCartAddress: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        withCredentials: false, // if true will pass all cookies
        mutation: checkoutSchema.updateAddress
      },
      getCartVersion: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        withCredentials: false, // if true will pass all cookies
        query: checkoutSchema.getVersion
      },
      getProducts: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        withCredentials: false, // if true will pass all cookies
        query: productQuery
      },
      payment: {
        method: 'post',
        baseURL: `${ baseDomainCT }/payments`
      },
      createOrder: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        mutation: CreateOrder
      },
      addPromoCode: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        withCredentials: false, // if true will pass all cookies
        mutation: addPromoCode
      },
      removePromoCode: {
        method: 'post',
        baseURL: baseDomainCTGraphql,
        withCredentials: false, // if true will pass all cookies
        mutation: removePromoCode
      },
      mock: {
        method: 'get',
        params: {}, // do not include any default params
        baseURL: `${ baseDomainCT }/mock`,
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
      getUserDetail: {
        method: 'get',
        baseURL: `${ baseDomainSFDCCustomer }/account`,
        withCredentials: false
      },
      getUserOrders: {
        method: 'get',
        baseURL: checkUATAPI ? `${ baseDomainSFDCCustomer }/orders?brand=ALL` : `${ baseDomainSFDCCustomer }/orders`, // Todo: API has to be fixed
        withCredentials: false
      },
      updateUserDetail: {
        method: 'patch',
        baseURL: `${ baseDomainSFDCCustomer }/account`,
        withCredentials: false
        // Need schema
      },
      addNewAddress: {
        method: 'post',
        baseURL: `${ baseDomainSFDCCustomer }/alt-address`,
        withCredentials: false
        // Need schema
      },
      updateAddress: {
        method: 'patch',
        baseURL: `${ baseDomainSFDCCustomer }/alt-address`,
        withCredentials: false
        // Need schema
      },
      deleteAddress: {
        method: 'delete',
        baseURL: `${ baseDomainSFDCCustomer }/alt-address`,
        withCredentials: false
        // Need schema
      },
      resetUserPassword: {
        method: 'post',
        baseURL: auth0ApiDomain,
        withCredentials: false
      },
      getUserSubscriptions: {
        method: 'get',
        baseURL: `${ baseDomainSubscription }/viewsubscription`,
        withCredentials: false,
        noBearer: true
      },
      editSubscriptionAddress: {
        method: 'post',
        baseURL: `${ baseDomainSubscription }/editaddress`,
        withCredentials: false,
        noBearer: true
        // Need schema
      },
      getPausedSubscriptionDates: {
        method: 'get',
        baseURL: `${ baseDomainSubscription }/pausenextdropdates`,
        withCredentials: false,
        noBearer: true
      },
      pauseASubscription: {
        method: 'post',
        baseURL: `${ baseDomainSubscription }/pauseandresume`,
        withCredentials: false, // if true will pass all cookies
        noBearer: true
      },
      cancelASubscription: {
        method: 'post',
        baseURL: `${ baseDomainSubscription }/cancelsubscription`,
        withCredentials: false, // if true will pass all cookies
        noBearer: true
      },
      getUserProducts: {
        method: 'get',
        baseURL: `${ baseDomainSFDCCustomer }/myproducts`,
        withCredentials: false
      },
      setHideProduct: {
        method: 'patch',
        baseURL: `${ baseDomainSFDCCustomer }/myproducts`,
        withCredentials: false
      },
      GetPaymentVersion: {
        method: 'post',
        baseURL: `${ baseDomainCT }/graphql`,
        mutation: userSchema.GetPaymentVersion
      }
    };

    return service[name];

  }
}

export default new Services();
