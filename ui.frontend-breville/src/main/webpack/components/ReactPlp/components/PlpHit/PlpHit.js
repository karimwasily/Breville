import React from 'react';
import { object } from 'prop-types';
import { ComparisonItem } from 'components/ReactPlp/components/Comparison/ComparisonItem';
import { AlgoliaProductTile } from 'components/shared-ui/ProductTile';

// hit result component passed from Algolia
export const PlpHit = ( { hit } ) => {
  return (
    <ComparisonItem item={ hit }>
      <AlgoliaProductTile hit={ hit } />
    </ComparisonItem>
  );
};

PlpHit.propTypes = {
  hit: object
};