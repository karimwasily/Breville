import React from 'react';
import { Tooltip } from 'components/shared-ui/Tooltip';
import { bool } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectProductVariantPDPImage } from 'library/store/product/selector';

// Mock data fallback for share list
const shareListMockData = [
  {
    id: '1',
    type: 'facebook',
    url: 'https://www.facebook.com/sharer.php?u='
  },
  {
    id: '2',
    type: 'pinterest',
    url: 'https://www.pinterest.com/pin/create/bookmarklet/?url='
  },
  {
    id: '3',
    type: 'twitter',
    url: 'https://twitter.com/share?url='
  },
  {
    id: '4',
    type: 'email',
    url: 'mailto:?subject=Email%20Subject&body=Email%20description%0D%0A'
  }
];


export const SharePDP = ( { shareList } ) => {
  // Check if share list data exists, otherwise revert to mock data
  const isValidShareListData = shareList?.length > 0;
  if ( !isValidShareListData ) {
    console.warn( 'using mock data for share list' );
    shareList = shareListMockData;
  }

  const productVariantPDPImage = useSelector( selectProductVariantPDPImage );

  const { t } = useTranslation();

  const tooltipContentHtmlString = shareList.map( ( item ) => {
    let queryString = window.location.href;

    // PINTEREST also requires image src
    if ( item.type === 'pinterest' ) {
      // https://pinterest.com/pin/create/bookmarklet/?url=${URL}&media=${IMG}
      queryString += `&media=${ productVariantPDPImage }`;
    }

    return `<a key='${ item.id }' href='${ item.url }${ queryString }' target='_blank'>
              <span class='tooltip-content tooltip-content-${ item.type }'></span>
            </a>`;
  } ).join( '' );

  return (
    <Tooltip
      id='social-media-tooltip'
      tooltipContent={ tooltipContentHtmlString }
      html={ true }
    >
      <div className='primary-product-container__share'>
        { t( 'pdp-share' ) }
        <span className='share-icon'></span>
      </div>
    </Tooltip>
  );
};

SharePDP.propTypes = {
  html: bool
};
