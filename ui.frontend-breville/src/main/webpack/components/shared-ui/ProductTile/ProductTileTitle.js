import React from 'react';
import {
  string
} from 'prop-types';
export const ProductTileTitle = ( {
  pdpUrl,
  title
} ) => {

  return (
    <>
      { pdpUrl ? (
        <a href={ pdpUrl }>
          <h3 className='cmp-producttile__title'>{ title }</h3>
        </a>
      ) : (
        <h3 className='cmp-producttile__title'>{ title }</h3>
      ) }

    </>
  );
};

ProductTileTitle.propTypes = {
  pdpUrl: string,
  title: string
};
