import React, { useEffect } from 'react';
import { connectStats } from 'react-instantsearch-core';
import { number, string, bool } from 'prop-types';

/**
 * Custom Algolia Stats Component
 *
 * @params {{
 *  nbHits?: number,
 *  processingTimeMS?: number,
 *  nbSortedHits?: number,
 *  areHitsSorted?: boolean,
 *  withBrackets?: boolean,
 *  className?: string
 * }}  args
 * @returns {React.ReactElement}
 */
const StatsHits = ( { nbHits, handleNbHits, withBrackets = false, hide = false, className = '' } ) => {
  useEffect( () => {
    if ( handleNbHits ) handleNbHits( nbHits );
  }, [nbHits] );

  if ( hide ) return null;

  return (
    <span className={ className }>
      { withBrackets && '(' }
      { nbHits }
      { withBrackets && ')' }
    </span>
  );
};

StatsHits.defaultProps = {
  withBrackets: false,
  hide: false,
  className: ''
};
StatsHits.propTypes = {
  nbHits: number,
  withBrackets: bool,
  hide: bool,
  className: string
};

const StatsSpeed = ( { processingTimeMS, className = '' } ) => (
  <span className={ className }>{ processingTimeMS }</span>
);
StatsSpeed.defaultProps = {
  className: ''
};

StatsSpeed.propTypes = {
  processingTimeMS: number,
  className: string
};

/**
 * available react component attributes
 * @typedef {Object} args
 * @property {object} translations
 */

/**
 * @typedef {{
 *  translations?: object
 * }} customStatsArgs
 */

/**
 * @type {function(customStatsArgs)}
 */
export const CustomStatsHits = connectStats( StatsHits );

/**
 * @type {function(customStatsArgs)}
 */
export const CustomStatsSpeed = connectStats( StatsSpeed );
