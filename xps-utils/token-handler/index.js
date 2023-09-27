import axios from "axios";
import { configuration } from 'xps-utils/configuration'
const { awsApiUrl } = configuration();
import { setAuthData } from 'xps-utils/authtokendatahandler';

// commercetools endpoint
const baseDomainCT = `${awsApiUrl}/commercetools`

function getAuthenticatedAuth0Token(){
  setAuthData();
}

/**
 * This method will get the anonymous token and store
 * access_token and refresh_token in localstorage
 * @returns {*}
 */
export const getAnonymousToken = (() => {
  // * preventive measure to avoid calling this function multiple times if request has already begun
  let fetchingToken = false;

  return async () => {
    if (fetchingToken) return

    const token = localStorage.getItem("access_token");
    const userWelcomed = localStorage.getItem("userWelcomed");
    if (userWelcomed === 'true'){
      getAuthenticatedAuth0Token();
      return;
    }
    if (token)  return;

    // * setting flag just before request to gurantee it will eventually revert back to 'false'
    fetchingToken = true

    return await axios
      .post(`${baseDomainCT}/oauth/anonymous`)
      .then(({ data }) => {
        const { access_token, refresh_token } = JSON.parse(data);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        fetchingToken = false
      });
  }
})();

/**
 * This method will get new anonymous token from service
 * and update access_token and refresh_token in local storage
 * @returns 
 */
 export const getRefreshToken = async() => {
  const userWelcomed = localStorage.getItem("userWelcomed");
  if (userWelcomed === 'true'){
    getAuthenticatedAuth0Token();
    return;
  }
  const token = localStorage.getItem("refresh_token");
  return await axios.post(`${baseDomainCT}/oauth/refresh-token/${token}`)
  .then(({ data }) => {
    const statusCodes = [400, 401];
    const response = JSON.parse(data);
    if(statusCodes.includes( response.statusCode || !response.access_token)) {
      configuration.stopRetry = true;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token')
      getAnonymousToken();
    } else {
      localStorage.setItem("access_token", response.access_token);    
    }
  })
  .catch((error) => {
    configuration.stopRetry = true;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token')
    getAnonymousToken();
    console.error(error);
  });
}