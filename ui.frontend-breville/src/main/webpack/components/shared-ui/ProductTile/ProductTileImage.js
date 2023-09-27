import React from 'react';
import {
  string
} from 'prop-types';
export const ProductTileImage = ( {
  pdpUrl,
  imgSrc,
  imgAlt
} ) => {

  return (
    <>
      { pdpUrl ? (
        <a href={ pdpUrl }>
          <img
            src={ imgSrc }
            className='cmp-image__image'
            itemProp='contentUrl'
            alt={ imgAlt }
          />
        </a>
      ) : (
        <img
          src={ imgSrc }
          className='cmp-image__image'
          itemProp='contentUrl'
          alt={ imgAlt }
        />
      ) }

    </>
  );
};

ProductTileImage.propTypes = {
  pdpUrl: string,
  imgScr: string,
  imgAlt: string
};
