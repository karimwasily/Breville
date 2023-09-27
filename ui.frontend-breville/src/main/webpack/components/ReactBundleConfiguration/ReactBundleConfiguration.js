import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { MachineConfiguration } from './views/Step1Machine';
import { CoffeeConfiguration } from './views/Step2Coffee';
import { BundleConfiguration } from './views/Step3Bundle';
import { ScrollToTop } from './utils/scrollToTop';

import { Redirect, Route, Switch } from 'react-router-dom';
import { withAem } from 'xps-utils/withAem';
import {
  BUNDLE_SUMMARY_VIEW,
  COFFEE_CONFIG_VIEW,
  MACHINE_CONFIG_VIEW
} from './constants';

import mockAemData from './mock-data/mockBundleAemData.json';
import { Steps } from './components/Steps';
import { useDispatch } from 'react-redux';
import { initCart, setBundleDiscountPercentage, setNumberOfCoffeeBags } from 'library/store/bundle/actions';

function fallbackToMockDataCheck( aemData, mockData ) {
  const data = aemData;

  const isValidBundleDiscountPercentage = aemData?.bundleDiscountPercentage;
  if ( !isValidBundleDiscountPercentage ) {
    console.warn( 'using mock data for bundle discount percentage' );
    data.bundleDiscountPercentage = mockData.bundleDiscountPercentage;
  }

  const isValidNumOfCoffeeBags = aemData?.numOfCoffeeBags;
  if ( !isValidNumOfCoffeeBags ) {
    console.warn( 'using mock data for number of coffee bags' );
    data.numOfCoffeeBags = mockData.numOfCoffeeBags;
  }

  const isValidQuestionnaireData = aemData?.questionnaire?.questionAnswers?.length > 0;
  if ( !isValidQuestionnaireData ) {
    console.warn( 'using mock data for questionnaire' );
    data.questionnaire = mockData.questionnaire;
  }

  const isValidRoasterData = aemData?.roasters?.length > 0;
  if ( !isValidRoasterData ) {
    console.warn( 'using mock data for roasters' );
    data.roasters = mockData.roasters;
  }

  return data;
}

const ReactBundleConfiguration = ( { aemData } ) => {
  const data = fallbackToMockDataCheck( aemData, mockAemData );

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( initCart() );
    dispatch( setBundleDiscountPercentage( aemData?.bundleDiscountPercentage ) );
    dispatch( setNumberOfCoffeeBags( aemData?.numOfCoffeeBags ) );
  }, [] );

  return (
    <>
      <ScrollToTop />
      <Steps />
      <Switch>
        <Route exact path={ MACHINE_CONFIG_VIEW } >
          <MachineConfiguration />
        </Route>
        <Route exact path={ COFFEE_CONFIG_VIEW }>
          <CoffeeConfiguration aemData={ data } />
        </Route>
        <Route exact path={ BUNDLE_SUMMARY_VIEW }>
          <BundleConfiguration />
        </Route>
        <Redirect to={ MACHINE_CONFIG_VIEW } />
      </Switch>
    </>
  );
};

ReactBundleConfiguration.propTypes = {
  aemData: object
};

export default withAem( ReactBundleConfiguration );
