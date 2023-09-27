/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { string, number, object, func, bool } from 'prop-types';
import { connectRange } from 'react-instantsearch-dom';
import { displayPrice } from 'xps-utils/format';

// Prerequisite: install rheostat@4
import 'rheostat/css/rheostat.css';
import 'rheostat/initialize';
import Rheostat from 'rheostat';

/**
 * Custom Algolia RangeSlider
 *
 * @params {{
 *  min: number,
 *  max: number,
 *  currentRefinement: object,
 *  canRefine: boolean,
 *  refine: function,
 *  className?: string,
 *  }} args
 * @returns {React.ReactElement}
 */
const RangeSlider = ( {
  min,
  max,
  currentRefinement,
  canRefine,
  refine,
  precision,
  currencySymbol = '$',
  className = ''
} ) => {
  const [stateMin, setStateMin] = useState( min );
  const [stateMax, setStateMax] = useState( max );

  useEffect( () => {
    if ( canRefine ) {
      setStateMin( currentRefinement.min );
      setStateMax( currentRefinement.max );
    }
  }, [currentRefinement.min, currentRefinement.max] );

  if ( min === max ) {
    return null;
  }

  const onChange = ( { values: [min, max] } ) => {
    if ( currentRefinement.min !== min || currentRefinement.max !== max ) {
      refine( { min, max } );
    }
  };

  const onValuesUpdated = ( { values: [min, max] } ) => {
    setStateMin( min );
    setStateMax( max );
  };

  return (
    <div className={ className }>
      <Rheostat
        min={ min }
        max={ max }
        values={ [currentRefinement.min, currentRefinement.max] }
        onChange={ onChange }
        onValuesUpdated={ onValuesUpdated }
      >
        <div className='rheostat-marker rheostat-marker--large-left'>
          <div className='rheostat-value'>
            <label htmlFor='min'>{ displayPrice( stateMin, currencySymbol ) }</label>
          </div>
        </div>
        <div className='rheostat-marker rheostat-marker--large-right'>
          <div className='rheostat-value'>
            <label htmlFor='max'>{ displayPrice( stateMax, currencySymbol ) }</label>
          </div>
        </div>
      </Rheostat>
    </div>
  );
};

RangeSlider.defaultProps = {
  currencySymbol: '$',
  className: ''
};

RangeSlider.propTypes = {
  min: number,
  max: number,
  currentRefinement: object,
  canRefine: bool,
  refine: func,
  precision: number,
  currencySymbol: string,
  className: string
};

/**
 * @typedef {{
 *  attribute: string,
 * }} customRangeSliderArgs
 */

/**
 * @type {function(customRangeSliderArgs)}
 */
export const CustomRangeSlider = connectRange( RangeSlider );
