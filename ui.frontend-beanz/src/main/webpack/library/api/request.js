import axios from 'axios';
import services from './services';
import { getRefreshToken, getAnonymousToken } from 'xps-utils/token-handler';
import { getgraphqlResponse } from 'xps-utils/graphql-response-handler';
import { showErrorModal } from '../../aem-components/beanz/errormodal/js/errormodal.js';
import waitForCondition from 'xps-utils/wait-for-condition';

const defaultTimeout = 60000;

/**
 * This method will create instane of axios
 * @param {String} serviceName name of service defined in services.js
 * @param {Object} configuration configuration object supported by axios
 * @returns {Object}
 */
const instance = ( serviceName, configuration = {} ) => {
  const serviceConfig = services.getService( serviceName );
  const { url = '', ...otherConfig } = configuration;
  serviceConfig.baseURL = url ? `${ serviceConfig.baseURL }/${ url }` : serviceConfig.baseURL;
  const config = Object.assign(
    {
      timeout: defaultTimeout,
      maxRedirects: 0
    },
    serviceConfig,
    otherConfig,
  );

  config.params = { ...serviceConfig.params, ...otherConfig.params };
  config.headers = {
    ...config.headers,
    ...serviceConfig.headers
  };

  const serviceInstance = axios.create( config );
  // Authorization request interceptor
  serviceInstance.interceptors.request.use(
    async function ( config ) {
      // NOTE: This is how we can send authorization header for every request
      await waitForCondition( () => localStorage.getItem( 'access_token' ) );
      await getAnonymousToken();
      if ( config.baseURL.includes( 'subscription' ) ){
        config.headers.Authorization = `${ localStorage.getItem( 'access_token' ) }`;
      }
      else {
        config.headers.Authorization = `Bearer ${ localStorage.getItem( 'access_token' ) }`;
      }
      if ( serviceConfig.query ) config.data = { query: serviceConfig.query };
      if ( serviceConfig.mutation ) config.data = { query: serviceConfig.mutation, variables: config.variables };
      return config;
    },
    function ( error ) {
      return Promise.reject( error );
    },
  );

  // Authorization response interceptor
  // Authorization response interceptor
  serviceInstance.interceptors.response.use(
    async function ( response ) {
      const statusCodes = [401, 403, 502, 504];
      const resp = await getgraphqlResponse( response );
      if ( resp.hasErrors && statusCodes.includes( resp.statusCode ) && !configuration.stopRetry ){
        configuration.stopRetry = true;
        if ( resp.data.errors[0]['code'] !== 'ExternalOAuthFailed' ) {
          await getRefreshToken();
          showErrorModal( '.failApiErrorModal' );
        }
        return instance( serviceName, configuration ).request();
      }

      if ( resp.hasErrors ) throw response;
      return response;
    },
    async function ( error ) {
      const errorCode = [401, 403, 502];
      const { response } = error;
      if ( response && errorCode.includes( response.status ) && !configuration.stopRetry ) {
        localStorage.removeItem( 'access_token' );
        configuration.stopRetry = true;
        await getRefreshToken();
        return instance( serviceName, configuration ).request();
      }
      return Promise.reject( error );
    },
  );

  if ( serviceConfig.interceptors ) {
    Object.entries( serviceConfig.interceptors ).forEach( ( interceptor ) => {
      if ( typeof interceptor[1] === 'function' ) {
        serviceInstance.interceptors[interceptor[0]].use( interceptor[1] );
      }
      else if ( typeof interceptor[1] === 'object' ) {
        serviceInstance.interceptors[interceptor[0]].use( interceptor[1]['success'], interceptor[1]['error'] );
      }
    } );
  }
  return serviceInstance;
};

/**
 * This method will make get request using axios instance
 * @param {String} serviceName name of service defined in services.js
 * @param {Object} configuration list of configuration
 */
const get = async ( serviceName, configuration = {} ) => {
  const serviceInstance = instance( serviceName, configuration );
  const response = await serviceInstance
  .request()
  .then( ( res ) => {
    return res;
  } )
  .catch( ( e ) => {
    // TODO: Implement error handler
    return e.response;
  } );
  return response;
};

/**
 * This method will make post request using axios instance
 * @param {String} serviceName  name of service defined in services.js
 * @param {Object} param1 list of configuration
 */
const post = async ( serviceName, { data, ...otherConfig } = {} ) => {
  const config = Object.assign(
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post'
    },
    otherConfig,
  );

  const serviceInstance = instance( serviceName, config );
  return await serviceInstance
  .request( { data } )
  .then( ( res ) => {
    if ( res === undefined ) {
      // TODO: Implement logger
    }
    else if ( res.data && res.data.errors ) {
      // TODO: Implement logger
      console.log( res.data.errors );
    }
    return res && res.data;
  } )
  .catch( ( error ) => {
    console.error( error );
    throw error;
    // TODO: Implement logger
  } );
};

/**
 * This method will make post request using axios instance
 * @param {String} serviceName  name of service defined in services.js
 * @param {Object} param1 list of configuration
 */
const postforAccessToken = async ( serviceName, { data, ...otherConfig } = {} ) => {
  const config = Object.assign(
    {
      headers: {
        Accept: 'application/json'
      },
      method: 'post'
    },
    otherConfig,
  );

  const serviceInstance = instance( serviceName, config );
  return await serviceInstance
  .request( { data } )
  .then( ( res ) => {
    if ( res === undefined ) {
      // TODO: Implement logger
    }
    else if ( res.data && res.data.errors ) {
      // TODO: Implement logger
    }
    return res && res.data;
  } )
  .catch( ( error ) => {
    console.error( error );
    throw error;
    // TODO: Implement logger
  } );
};


/**
 * This method will make put request using axios instance
 * @param {String} serviceName  name of service defined in services.js
 * @param {Object} param1 list of configuration
 */
const put = async ( serviceName, { data, ...otherConfig } = {} ) => {
  const config = Object.assign(
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    },
    otherConfig,
  );

  const serviceInstance = instance( serviceName, config );
  return await serviceInstance
  .request( { data } )
  .then( ( res ) => {
    if ( res === undefined ) {
      // TODO: Implement logger
    }
    else if ( res.data && res.data.errors ) {
      // TODO: Implement logger
    }
    return res && res.data;
  } )
  .catch( ( error ) => {
    // TODO: Implement logger
    // NOTE: Handle error here
  } );
};

/**
 * This method will make put request using axios instance
 * @param {String} serviceName  name of service defined in services.js
 * @param {Object} configuration list of configuration
 */
const del = async ( serviceName, { data = {}, ...otherConfig } = {} ) => {
  const config = Object.assign(
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    },
    otherConfig,
  );

  const serviceInstance = instance( serviceName, config );
  return await serviceInstance
  .request( { data } )
  .then( ( res ) => {
    if ( res === undefined ) {
      // TODO: Implement logger
    }
    else if ( res.data && res.data.errors ) {
      // TODO: Implement logger
    }
    return res && res.data;
  } )
  .catch( ( error ) => {
    // TODO: Implement logger
  } );
};

/**
 * This method will make put request using axios instance
 * @param {String} serviceName  name of service defined in services.js
 * @param {Object} param1 list of configuration
 */
const patch = async ( serviceName, { data, ...otherConfig } = {} ) => {
  const config = Object.assign(
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    },
    otherConfig,
  );
  const serviceInstance = instance( serviceName, config );
  return await serviceInstance
  .request( { data } )
  .then( ( res ) => {
    if ( res === undefined ) {
      // TODO: Implement logger
    }
    else if ( res.data && res.data.errors ) {
      // TODO: Implement logger
    }
    return res && res.data;
  } )
  .catch( ( error ) => {
    // TODO: Implement logger
  } );
};

export default {
  get,
  post,
  put,
  del,
  instance,
  patch,
  postforAccessToken
};
