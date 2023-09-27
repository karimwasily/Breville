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
import i18n from './i18n';
import Modal from 'react-modal';
import { Auth0Provider } from '@auth0/auth0-react';

import { AuthLogin } from 'components/AuthLogin';

import { Provider } from 'react-redux';
import configureStore from 'library/store';

import { algoliaService } from 'xps-utils/algolia';
import AppLauncher from 'xps-utils/app-launcher';
import { getAnonymousToken } from 'xps-utils/token-handler';
import { getAEMGlobalConfig } from 'xps-utils/aemGlobalConfig';

// *1 IMPORT CUSTOM APPS AND ASSIGN ELEM HOOK TO MOUNT
import { ReactVideo } from '../components/ReactVideo';
import { Vendors } from '../components/Vendors';
import { ReactCarousel } from '../components/ReactCarousel';
import { ReactBundleConfiguration } from '../components/ReactBundleConfiguration';
import { ReactPlp } from '../components/ReactPlp';
import { RelatedItems } from 'components/shared-ui/AlgoliaCustomWidgets';
import { ProductsList } from '../containers/ProductsList';
import BottomOfFunnel from 'containers/bof';
import OrderConfirmation from '../containers/order-confirmation';
import { SearchDropdown } from 'components/SearchDropdown';
import { SearchResults } from 'components/SearchResults';
import PageTemplate from './page-template';
import { BrowserRouter as Router } from 'react-router-dom';
import { MyBrevilleApplication } from '../containers/mybreville-application';
import { Pdp } from 'containers/Pdp';
import { ProductCompare } from 'containers/ProductCompare';
import { RegisteredProductsSupport } from 'components/registered-products-support';
import { ButtonModalList } from 'components/ButtonModalList';

// *2 COMPONENT MOUNTED VIA 'data-react-app="ReactVideo"'
ReactVideo.displayName = 'ReactVideo';
Vendors.displayName = 'BeanzOurRoasters';
ReactCarousel.displayName = 'ReactCarousel';
ReactBundleConfiguration.displayName = 'ReactBundleConfiguration';
SearchDropdown.displayName = 'SearchDropdown';
SearchResults.displayName = 'SearchResults';
ReactPlp.displayName = 'ReactPlp';
ProductCompare.displayName = 'ProductCompare';
Pdp.displayName = 'ReactPdp';
ProductsList.displayName = 'ProductsList';
RelatedItems.displayName = 'RelatedItems';
MyBrevilleApplication.displayName = 'MyBrevilleApplication';
RegisteredProductsSupport.displayName = 'RegisteredProductsSupport';
ButtonModalList.displayName = 'ButtonModalList';

const {
  algoliaappid,
  algoliaapikey,
  algoliabrevilleindex,
  algoliabeanzindex,
  auth0Domain,
  auth0ClientId,
  auth0Audience,
  basePage,
  locale
} = getAEMGlobalConfig();

algoliaService.setup( algoliaappid, algoliaapikey, algoliabrevilleindex, algoliabeanzindex, locale );

const App = ( props ) => {

  useEffect( ()=>{
    getAnonymousToken();
  }, [] );

  const urlArray = window.location.pathname.split( '/' );

  const baseURL = urlArray
  ?.slice( 0, ( urlArray?.findIndex( ( string ) => string.includes( basePage ) ) + 1 ) )
  ?.join( '/' );

  return (
    <Auth0Provider
      domain={ auth0Domain }
      clientId={ auth0ClientId }
      redirectUri={ window.location.href }
      audience={ auth0Audience }
      scope='read:current_user update:current_user_metadata'
      useRefreshTokens={ true }
      cacheLocation='localstorage'
    >
      <Provider store={ configureStore( { ...props } ) }>
        <Router basename={ baseURL || '/' }>
          <PageTemplate>
            <I18nextProvider i18n={ i18n }>
              <AuthLogin />
              <AppLauncher>
                { /* // *3 ADD CUSTOM APP */ }
                <ReactVideo />
                <Vendors />
                <ReactCarousel />
                <ReactBundleConfiguration />
                <SearchDropdown />
                <SearchResults />
                <ReactPlp />
                <ProductCompare />
                <Pdp />
                <RelatedItems />
                <ProductsList />
                <BottomOfFunnel />
                <OrderConfirmation />
                <MyBrevilleApplication />
                <RegisteredProductsSupport />
                <ButtonModalList />
              </AppLauncher>
            </I18nextProvider>
          </PageTemplate>
        </Router>
      </Provider >
    </Auth0Provider>
  );
};

Modal.setAppElement( document.getElementsByTagName( 'body' ) );

ReactDOM.render(
  <App />, document.getElementById( 'react-root' )
);

export default App;
