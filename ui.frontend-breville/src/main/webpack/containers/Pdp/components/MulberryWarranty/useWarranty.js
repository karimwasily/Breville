import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWarrantyDetail } from 'library/store/cart/selector';

export function useWarranty( productVariant ) {
  // Allow for easy look up of deeply nested key.
  const _stringifiedProductVariant = JSON.stringify( productVariant );
  const [selectedWarranty, setSelectedWarranty] = useState();
  const warrantyDetail = useSelector( selectWarrantyDetail );

  // Reset selected warranty when user change variant
  const productSKU = productVariant?.sku;
  useEffect( () => {
    setSelectedWarranty( '' );
  }, [productSKU] );

  // Only return the warranty detail of the current variant
  const warrantyData = warrantyDetail
    ? Object.values( warrantyDetail ).filter( ( warranty ) => _stringifiedProductVariant.includes( warranty.id ) )
    : [];

  return {
    warrantyData,
    selectedWarranty,
    setSelectedWarranty
  };
}