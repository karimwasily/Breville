const IS_DEV = process.env.ENV === "development";

/**
 * utility to grab aws api config from aem page
 * @returns {object}
 */
export const configuration = () => {
  let config = {
    awsApiUrl: '',
    auth0ApiDomain: ''
  };

  if (document.querySelector('.awsAPIconfig')) {
    const configElement = document.querySelector('.awsAPIconfig');
    const awsApiConfig = configElement?.getAttribute('data-aws-api-config');
    const auth0ApiDomain = configElement?.getAttribute('data-auth0-api-domain');

    try {
      config = JSON.parse(awsApiConfig);

      // Verify awsApiUrl
      if ( !config?.awsApiUrl ) {
        // fallback to dev state if config is not provided on aem page
        if ( IS_DEV ) {
          console.error( 'AWS API is not configured on the page. Using dev fallback' );
          config.awsApiUrl = 'https://dev-api.foodthinkers.com';
        }
        else {
          console.error( 'AWS API is not configured on the page.' );
        }
      }

      // Verify auth0ApiDomain
      if ( auth0ApiDomain ) {
        config.auth0ApiDomain = auth0ApiDomain;
      }
      else {
        if ( IS_DEV ) {
          console.error( 'Auth0 API is not configured on the page. Using dev fallback' );
          config.auth0ApiDomain = 'https://iden-dev.us.auth0.com';
        }
        else {
          console.error( 'Auth0 API is not configured on the page.' );
        }
      }

    }
    catch (err) {
      console.error(err);
    }
  }

  return config
}