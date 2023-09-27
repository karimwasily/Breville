import React, { useEffect, useState } from 'react';
import { array, func, object, string } from 'prop-types';
import { BrandHeroContent } from '../BrandHeroContent/BrandHeroContent';
import { QuestionnaireResultsOverview } from './QuestionnaireResultsOverview';
import { algoliaService } from 'xps-utils/algolia';

export const QuestionnaireResults = ( {
  answered,
  startOver,
  handleProductSelect,
  selectedProduct,
  coffeeProducts,
  baristaChoiceFacet,
  vendorsData
} ) => {
  const [details, setDetails] = useState( [] );

  useEffect( () => {
    if ( coffeeProducts.length > 0 ) {
      setDetails( coffeeProducts );
    }
    else {
      // TODO: this fallback will be remove in the future when correct aem data is provided
      const vendorsSearch = vendorsData?.map( ( vendor ) => `vendorNumber: "${ vendor.id }"` );
      const filterString = vendorsSearch?.join( ' OR ' );
      algoliaService.searchBeanzIndex( '', {
        filters: filterString ? filterString : '',
        offset: 0,
        length: 3
      } )
      .then( ( data ) => {
        setDetails( data.hits );
      } );
    }
  }, [] );

  if ( details.length === 0 ) {
    return <div>Loading...</div>;
  }

  const productDetails = details?.map( ( product ) => {
    const vendor = vendorsData.filter( ( roaster ) => roaster.id === product.vendorNumber );
    return {
      brand: vendor?.[0],
      ...product
    };
  } ) || [];

  return (
    <>
      <QuestionnaireResultsOverview answered={ answered } startOver={ startOver } />
      <BrandHeroContent
        products={ productDetails }
        handleProductSelect={ handleProductSelect }
        selectedProduct={ selectedProduct }
        baristaChoiceFacet={ baristaChoiceFacet }
      />
    </>
  );
};
QuestionnaireResults.propTypes = {
  answered: array,
  startOver: func,
  handleProductSelect: func,
  selectedProduct: object,
  coffeeProducts: array,
  baristaChoiceFacet: string
};
