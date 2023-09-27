import { useEffect, useState } from 'react';
import { parseParams } from 'xps-utils/parseParams';

export const useCompareProductsQueryParams = () => {
  const [skus, setSkus] = useState( [] );
  const [category, setCategory] = useState( null );

  // get url query params
  useEffect( ()=> {
    const params = parseParams( document.location.search );
    const skus = params?.compare?.split( ',' );
    const category = params?.category;

    setSkus( skus );
    setCategory( category );
  }, [] );

  return [skus, category];
};
