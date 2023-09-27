import React, { useEffect, useState } from 'react';
import { string, func } from 'prop-types';
import { SectionWithHeading } from '../SectionWithHeading';
import { filterVisibleAlgoliaHits } from 'library/utils/filterVisibleAlgoliaHits';
import { AlgoliaCarousel } from './AlgoliaCarousel';

/**
 * algolia carousel widget
 * @param {object} props props
 * @param {string} props.title widget title
 * @param {() => Promise} props.fetchRequest fetch request
 * @returns {React.ReactElement}
 */

export const AlgoliaCarouselWidget = ( { title, fetchRequest } ) => {
  const [hits, setHits] = useState( [] );
  const [isLoading, setIsLoading] = useState( false );
  const [error, setError] = useState( null );

  useEffect( () => {
    setIsLoading( true );
    fetchRequest()
    .then( filterVisibleAlgoliaHits )
    .then( ( hits ) => {
      setHits( hits );
    } )
    .catch( ( err ) => {
      console.error( err );
      setError( err );
    } )
    .finally( () => setIsLoading( false ) );
  }, [] );

  if ( error || isLoading || hits.length === 0 ) return null;

  return (
    <SectionWithHeading title={ title }>
      <AlgoliaCarousel hits={ hits } />
    </SectionWithHeading>
  );

};

AlgoliaCarouselWidget.propTypes = {
  title: string.isRequired,
  fetchRequest: func.isRequired
};
