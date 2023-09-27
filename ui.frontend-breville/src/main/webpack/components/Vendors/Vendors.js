import React, { useState } from 'react';
// import { BrandCarousel } from 'components/shared-ui/BrandCarousel';
import { VendorCarousel } from 'components/shared-ui/VendorCarousel';
import { Image } from 'components/shared-ui/image';
import { withAem } from 'xps-utils/withAem';
import vendorMockData from './vendorMockData.json';

// todo: this is a temporary fallback to allow the widget to work in AEM while we do not have correct BE data to support it
function checkForValidAEMRoasterData( aemData ) {
  // logic will be to determine if we have enough roasters available to show with actual data
  // * minimum of 7 to complete a full row in the carousel
  if ( aemData?.roasters?.length >= 7 ) {
    return true;
  }
  else {
    console.warn( 'using mock data for brand carousel' );
    return false;
  }
}

const Vendors = ( { aemData, children, onVendorChange } ) => {
  const aemDataExists = checkForValidAEMRoasterData( aemData );
  const data = aemDataExists ? aemData : vendorMockData;

  const [vendors, setVendors] = useState( data?.roasters );
  const [vendor, setVendor] = useState( data?.roasters[0] );

  function handleBrandChange( idx ) {
    const v = vendors[idx];
    setVendor( v );
    if ( onVendorChange ) onVendorChange( v );
  }

  if ( !vendors ) return null;

  return (
    <div className='vendors'>
      <div className='vendors__container'>
        <div className='vendors__header'>
          <VendorCarousel
            brandImgs={ vendors.map( ( v ) => v.brandImg ) }
            brandImgAlts={ vendors.map( ( v ) => v.brandImgAlt ) }
            onChange={ handleBrandChange }
          />
        </div>
        <div className='vendors__content'>
          <div className='vendor__description'>
            <div className='vendor__inner'>
              <div className='vendor__secondary-image'>
                <Image className='vendor__secondary-image__image' src={ vendor.secondaryImg } alt={ vendor.secondaryImgAlt } />
              </div>
              <div className='vendor__details'>
                <div className='vendor__title'>{ vendor.title }</div>
                <div className='vendor__location'>{ vendor.location }</div>
              </div>
            </div>
            <div className='vendor__info'>
              <p>{ vendor.description }</p>
            </div>
            <div className='vendor__logo'>
              <Image className='vendor__logo__image' src={ vendor.brandImg } alt={ vendor.brandImgAlt } />
            </div>
          </div>
          <div className='vendor__primary-image'>
            <Image className='vendor__primary-image__image' src={ vendor.primaryImg } alt={ vendor.primaryImgAlt } />
          </div>
          { children && <div className='vendor__content-inner'>{ children }</div> }
        </div>
      </div>
    </div>
  );
};

export default withAem( Vendors );
