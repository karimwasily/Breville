import React, { useEffect } from 'react';
import { object } from 'prop-types';
import {
  BROWSE_TAB,
  BUNDLE_SUMMARY_VIEW,
  COFFEE_CONFIG_VIEW,
  QUESTIONNAIRE_TAB
} from '../../constants';
import { BrowseView } from './components/Browse/BrowseView';
import { LandingView } from './components/Landing/LandingView';
import { Layout } from './components/Layout/Layout';
import { TabWrapper } from './components/Tabs/TabWrapper';
import { QuestionnaireView } from './components/Questionnaire/QuestionnaireView';
import { useHistory } from 'react-router-dom';
import { setCoffee, setCoffeeTab, setView } from 'library/store/bundle/actions';
import { selectBundleDiscountPercentage, selectCoffee, selectCoffeeTab, selectNumberOfCoffeeBags } from 'library/store/bundle/selector';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectCurrencySymbol } from 'library/store/global/selector';

export const CoffeeConfiguration = ( { aemData } ) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const coffee = useSelector( selectCoffee );
  const tabID = useSelector( selectCoffeeTab );
  const currencySymbol = useSelector( selectCurrencySymbol );
  const bundleDiscountPercentage = useSelector( selectBundleDiscountPercentage );
  const numOfCoffeeBags = useSelector( selectNumberOfCoffeeBags );
  const { pathname } = useLocation();

  useEffect( () => {
    dispatch( setView( COFFEE_CONFIG_VIEW ) );
  }, [] );

  function handleTab( tabId ) {
    if ( tabId ) dispatch( setCoffeeTab( tabId ) );
  }
  function handleProductSelect( product ) {
    dispatch( setCoffee( product ) );
  }
  function handleSubmit() {
    history.push( BUNDLE_SUMMARY_VIEW );
  }

  return (
    <Layout
      handleSubmit={ handleSubmit }
      submitDisabled={ !coffee }
      selectedProduct={ coffee }
      handleProductSelect={ handleProductSelect }
      bundleDiscountPercentage={ bundleDiscountPercentage }
      numOfCoffeeBags={ numOfCoffeeBags }
      currencySymbol={ currencySymbol }
    >
      { pathname.includes( COFFEE_CONFIG_VIEW ) && !tabID ? (
        <LandingView handleTab={ handleTab } />
      ) : (
        <TabWrapper activeTab={ tabID } handleTab={ handleTab } tabs={ [{
            id: QUESTIONNAIRE_TAB,
            label: 'Help Me Choose',
            content: <QuestionnaireView handleProductSelect={ handleProductSelect } selectedProduct={ coffee } aemData={ aemData } />
          },
          {
            id: BROWSE_TAB,
            label: 'Browse Coffee Roasters',
            content: <BrowseView handleProductSelect={ handleProductSelect } selectedProduct={ coffee } bundleDiscountPercentage={ bundleDiscountPercentage } currencySymbol={ currencySymbol } aemData={ aemData } />
          }] }
        />
      ) }
    </Layout>
  );
};

CoffeeConfiguration.propTypes = {
  aemData: object
};
