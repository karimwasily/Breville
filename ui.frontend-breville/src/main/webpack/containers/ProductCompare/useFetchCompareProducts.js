import { useEffect } from 'react';
import { updateWithLocaleVariantsAttr } from 'library/saga/bundle/helper';
import { getMachinesViaFinishedGoodsKEYRequest } from 'library/store/bundle/service-request';
import { extractWarrantyInformation } from 'library/utils/extractWarrantyInformation';
import { useDispatch } from 'react-redux';
import { fetchWarranty } from 'library/store/cart/actions';

export const useFetchCompareProducts = ( { setProducts, skus, webchannel, locale, category } ) => {

  const dispatch = useDispatch();

  // request product information
  useEffect( () => {
    if ( !skus || skus?.length === 0 ) return;

    // todo: get products
    const vars = { where: `key in (${ skus.map( ( sku ) => JSON.stringify( sku.toUpperCase() ) ).join( ',' ) })`, locale };
    getMachinesViaFinishedGoodsKEYRequest( vars ).then( ( res ) => {
      const products = res.data.products.results;

      const allProductVariants = products.map( ( product ) => product?.masterData?.current?.allVariants ).flat()
      .map( ( variant ) => variant.attributesRaw );
      const warrantyMap = extractWarrantyInformation( allProductVariants );

      if ( Object.keys( warrantyMap ).length ) {
        dispatch( fetchWarranty( warrantyMap ) );
      }

      // filter for correct variants via webchannel
      // also add helper getter values
      const updatedProducts = updateWithLocaleVariantsAttr( products, { webchannel, locale } );

      // * filter based on category to insure correct comparison
      const singleCategoryUpdatedProducts = updatedProducts.filter( ( product ) => Boolean( product?.masterData?.current?.categories.find( ( categoryItem ) => categoryItem?.key === category?.toUpperCase() ) ) );

      setProducts( singleCategoryUpdatedProducts );
    } );

  }, [skus] );

};
