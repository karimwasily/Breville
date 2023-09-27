import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { object } from 'prop-types';
import { selectCoffee, selectMachineName } from 'library/store/bundle/selector';
import classNames from 'classnames';
import {
  BUNDLE_SUMMARY_VIEW,
  COFFEE_CONFIG_VIEW,
  MACHINE_CONFIG_VIEW
} from 'components/ReactBundleConfiguration/constants';
import { useTranslation } from 'react-i18next';

const STEPS = {
  [MACHINE_CONFIG_VIEW]: [
    { state: '--active', tick: false },
    { state: '', tick: false },
    { state: '', tick: false }
  ],
  [COFFEE_CONFIG_VIEW]: [
    { state: '--disabled', tick: true },
    { state: '--active', tick: false },
    { state: '', tick: false }
  ],
  [BUNDLE_SUMMARY_VIEW]: [
    { state: '--disabled', tick: true },
    { state: '--disabled', tick: true },
    { state: '--active', tick: false }
  ]
};

const PATHS = [MACHINE_CONFIG_VIEW, COFFEE_CONFIG_VIEW, BUNDLE_SUMMARY_VIEW];

export const Steps = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const steps = [
    { label: t( 'cs-select-your-machine' ) },
    { label: t( 'cs-choose-your-coffee' ) },
    { label: t( 'cs-bundle-summary' ) }
  ];


  // get the last part of the pathname
  const path = `/${ pathname.split( /\//g ).slice( -1 )[0] }`;
  const currentRouteSteps = STEPS[path];
  const currIndex = PATHS.indexOf( path );

  function handleStepWrap( index ) {
    return function handleBtnClick() {
      if ( index > currIndex ) {
        return;
      }
      history.push( PATHS[index] );
    };
  }

  // get the product and coffee details
  const machineName = useSelector( selectMachineName );
  const coffee = useSelector ( selectCoffee );

  // if the path doesn't match the key of the STEPS let's fail safely
  if ( !currentRouteSteps ) return null;

  // set each step's value as the machine/coffee is selected
  if ( machineName ) steps[0].label = machineName;

  if ( coffee ) {
    steps[1].label = `${ coffee.brand } ${ coffee.productName }`;
  }

  return (
    <div className='steps'>
      { currentRouteSteps.map( ( { state, tick }, index ) =>
        (
          <div key={ index } className='steps__step'>
            <button
              className={ classNames( 'steps__indicator', `steps__indicator${ state }` ) }
              onClick={ handleStepWrap( index ) }
            >
              { tick ? <i className='steps__tick'></i> : `${ index + 1 }` }
            </button>
            { /* If a machine or coffee is selected, apply this to the label, otherwise use the defaults ) */ }
            <p className={ classNames( `steps__text steps__text${ state }` ) }>{ steps[index].label }</p>
          </div>
        )
       ) }
    </div>
  );
};

Steps.propTypes = {
  aemData: object
};