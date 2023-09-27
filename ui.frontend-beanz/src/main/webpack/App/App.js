/*******************************************************************************
 *
 *    Copyright 2020 Adobe. All rights reserved.
 *    This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License. You may obtain a copy
 *    of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software distributed under
 *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *    OF ANY KIND, either express or implied. See the License for the specific language
 *    governing permissions and limitations under the License.
 *
 ******************************************************************************/
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'library/store';

import AppLauncher from 'xps-utils/app-launcher';
// *1 IMPORT CUSTOM APPS AND ASSIGN ELEM HOOK TO MOUNT
import { ReactQuestionnaire } from 'components/ReactQuestionnaire';
import { Plp } from 'components/ReactPlp';
import { Cart } from 'containers/cart';
import { ReactBeanzRelatedProducts } from 'components/ReactBeanzRelatedProducts';
import { Checkout } from 'components/checkout';

import { ReactMyBeanz } from 'components/ReactMyBeanz';
import { ReactMyBeanzAccount } from 'components/ReactMyBeanzAccount';
import { ReactBeanzPurchase } from 'components/ReactBeanzPurchase';
import { ReactBeanzSearch } from 'components/ReactBeanzSearch';
import { ReactLoggedIn } from 'components/ReactLoggedIn';


// Auth Components
import { AuthLogin } from 'components/AuthLogin';
import { Signup } from 'components/Signup';
import { Logout } from 'components/Logout';
import { getAnonymousToken } from 'xps-utils/token-handler';

//Configurations
import { configuration } from 'xps-utils/configuration'
const configurationData = configuration();

// *2 COMPONENT MOUNTED VIA 'data-react-app="ReactVideo"'
ReactQuestionnaire.displayName = 'ReactQuestionnaire'; // component mounted via 'data-react-app="ReactQuestionnaire"' OR 'id="ReactQuestionnaire"'
Plp.displayName = 'ReactPlp';
Cart.displayName = 'Cart';
ReactBeanzRelatedProducts.displayName = 'ReactBeanzRelatedProducts';
Checkout.displayName = 'Checkout';

// Component MOUNTED via 'data-ract-app="OrderConfirmation"'
import { OrderConfirmation } from 'components/OrderConfirmation';
OrderConfirmation.displayName = 'OrderConfirmation';
ReactMyBeanz.displayName = 'ReactMyBeanz';
ReactMyBeanzAccount.displayName = 'ReactMyBeanzAccount';
ReactBeanzPurchase.displayName = 'ReactBeanzPurchase';
ReactBeanzSearch.displayName = 'ReactBeanzSearch';
ReactLoggedIn.displayName = 'ReactLoggedIn';

import i18n from './i18n';

const App = ( props ) => {

  useEffect( ()=>{
    getAnonymousToken();
  }, [] );

  return (
    <Provider store={ configureStore( { ...props } ) }>
      <I18nextProvider i18n={ i18n }>
        { /* CUSTOM APPS */ }
        <AuthLogin />
        <Signup />
        <Logout />
        <AppLauncher>
          { /* // *4 ADD CUSTOM APP */ }
          <ReactQuestionnaire />
          <Plp />
          <Cart />
          <Checkout />
          <ReactBeanzRelatedProducts />
          <OrderConfirmation />
          <ReactMyBeanz />
          <ReactMyBeanzAccount />
          <ReactBeanzPurchase />
          <ReactBeanzSearch />
          <ReactLoggedIn />
        </AppLauncher>
      </I18nextProvider>
    </Provider>
  );

};

ReactDOM.render(
  <Router>
    <Auth0Provider
      domain={configurationData?.clientSecret}
      clientId={configurationData?.clientId}
      redirectUri={window.location.href}
      audience={configurationData?.apiUrl}
      scope={configurationData?.scopes}
      useRefreshTokens={true}
      cacheLocation='localstorage'
    >
      <App />
    </Auth0Provider>
  </Router>,
  document.getElementById( 'react-root' )
);

export default App;
