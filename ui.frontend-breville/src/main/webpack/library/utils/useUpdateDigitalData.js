import { selectLocale, selectWebChannel } from 'library/store/global/selector';
import { addHelperAttributesToVariant, getVariants } from 'library/utils/normalize';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * helper util to update digital data
 * @param {object} args args
 * @param {array} args.products list of parent products from CT
 * @param {'comparison' | 'pdp'} args.page page to create digitalData for
 * @param {object} [args.selectedVariant] currently selected variant
 */
export const useUpdateDigitalData = ( { products, page, selectedVariant = null } ) => {
  const webchannel = useSelector( selectWebChannel );
  const locale = useSelector( selectLocale );

  const updatedDigitalData = {};

  useEffect( () => {
    if ( !products?.filter( Boolean )?.length ) return;

    let digitalDataProducts;

    // * comparison page uses initial variant to populate 'products' field
    if ( page === 'comparison' ) {
      // construct 'products' analytics
      digitalDataProducts = products.map( ( product ) => {
        const variants = getVariants( product.masterData.current.allVariants, webchannel );
        // add helper attrs
        variants.forEach( ( variant ) => addHelperAttributesToVariant( { variant, webchannel, locale } ) );

        // * only return one variant per product
        const variant = variants[0];
        return formatProductSchema( product, variant );
      } );

      updatedDigitalData.products = digitalDataProducts;
    }

    // * pdp page uses all variants to populate 'products' field
    if ( page === 'pdp' ) {
      // there is only one product on the pdp
      const product = products[0];
      const variants = getVariants( product?.masterData?.current?.allVariants, webchannel );
      // add helper attrs
      variants.forEach( ( variant ) => addHelperAttributesToVariant( { variant, webchannel, locale } ) );

      // construct 'products' analytics
      digitalDataProducts = variants.map( ( variant ) => formatProductSchema( product, variant ) );

      // construct 'productColor' analytics
      const selectedProduct = digitalDataProducts?.find( ( product ) => product.productID === selectedVariant?.sku );

      updatedDigitalData.productColor = selectedProduct;
      updatedDigitalData.products = digitalDataProducts;
    }

    // * update digitalData window object
    global.digitalData = {
      ...window?.digitalData,
      ...updatedDigitalData
    };

  }, [products, selectedVariant] );
};

/**
 * calc base price for digital data
 * @param {object} price ct price value object
 * @returns {string}
 */
function calcBasePrice( price ) {
  const { centAmount, fractionDigits } = price;
  const basePrice = ( centAmount / Math.pow( 10, fractionDigits ) ).toFixed( fractionDigits );
  return basePrice;
}

/**
 * construct the shape of data required for digitalData analytics
 * this requires the variant data to be mutated (addHelperAttributesToVariant)
 * @param {object} product ct parent product
 * @param {object}  variant ct product variant
 * @returns {object}
 */
function formatProductSchema( product, variant ) {
  const schema = {
    noOfUnits: variant?._availability?.availableQuantity || 0,
    stockState: Boolean( variant?._availability?.isOnStock ),
    productID: variant.sku,
    color: variant._color.label,
    category: product?.masterData?.current?.categories?.[0]?.key?.toLowerCase(),
    productName: product?.masterData?.current?.name,
    basePrice: calcBasePrice( variant._price )
  };
  return schema;
}