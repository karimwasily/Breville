import React from 'react';
import { array } from 'prop-types';
import { AlgoliaProductTile } from 'components/shared-ui/ProductTile';
import { CarouselProductList } from 'containers/CarouselProductList';

/**
 * algolia carousel
 * @param {object} props props
 * @param {array} props.hits list of algolia hits
 * @returns {React.ReactElement}
 */

export const AlgoliaCarousel = ( { hits } ) => {

  function CarouselProductItem( item ) {
    return <AlgoliaProductTile hit={ item } />;
  }

  const viewLimit = 3;
  const numHits = hits.length;
  const isAllItemsNotVisible = numHits > viewLimit;

  /**
   * @see https://splidejs.com/options/
   */
  const config = {
    type: isAllItemsNotVisible ? 'loop' : 'slide',
    padding: 0,
    gap: 20,
    perPage: isAllItemsNotVisible ? viewLimit : numHits,
    perMove: viewLimit,
    focus: 'center',
    lazyLoad: isAllItemsNotVisible ? 'nearby' : false,
    arrows: isAllItemsNotVisible, // only show arrows if we have viewLimit or more items
    pagination: false,
    fixedWidth: 0,
    breakpoints: {
      575: {
        perPage: 1,
        perMove: 1,
        padding: 60,
        arrows: false,
        gap: 15
      },
      1200: {
        perPage: 3
      }
    }
  };

  if ( numHits === 0 ) return null;

  return (
    <CarouselProductList splideConfig={ config } items={ hits } render={ CarouselProductItem } itemWidth={ 300 } />
  );

};

AlgoliaCarousel.propTypes = {
  hits: array.isRequired
};
