import React from 'react';
import { object, array, func, number, bool } from 'prop-types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import classnames from 'classnames';
import { useShowCarousel } from './useShowCarousel';

/**
 * Carousel Product Layout Utility
 * @param {object} props props
 * @param {array?} props.items list of items data to render
 * @param {function} props.render render function to invoke on each item, expecting jsx to be returned
 * @param {number=} props.viewLimit number of items we want to visually see at a time on desktop view
 * @param {object=} [props.splideConfig] any additional override config for splide carousel
 * @param {number} [props.itemWidth] width of the item
 * @param {number} [props.containerWidth] width of the container
 * @see https://splidejs.com
 * @returns {React.ReactElement}
 */
export const CarouselProductList = ( { items = [], render, viewLimit = 3, splideConfig = {}, itemWidth = 370, containerWidth = 1200 } ) => {
  const isAllItemsNotVisible = items.length > viewLimit;

  /**
   * @see https://splidejs.com/options/
   */
  const config = {
    type: 'slide',
    padding: isAllItemsNotVisible ? 0 : 20,
    gap: 20,
    focus: 'center',
    lazyLoad: isAllItemsNotVisible ? 'nearby' : false,
    pagination: 'slider',
    arrows: false,
    perPage: isAllItemsNotVisible ? viewLimit : items.length,
    perMove: 1,
    fixedWidth: itemWidth,
    breakpoints: {
      575: {
        perPage: 1,
        perMove: 1,
        padding: 60,
        gap: 15
      },
      992: {
        perPage: 2
      },
      1200: {
        perPage: 3
      }
    },
    ...splideConfig
  };

  // num of items + gap > fits = no carousel
  const showCarousel = useShowCarousel( { minItemWidth: itemWidth, maxContainerWidth: containerWidth, numItems: items?.length, gap: config.gap } );

  // dynamic css custom properties to use in scss
  const cssCustomVarMap = {
    '--container-width': `${ containerWidth }px`,
    '--item-width': `${ itemWidth }px`,
    '--item-gap': `${ config?.gap || 0 }px`
  };

  if ( items.length === 0 ) return null;

  return (
    <div className={ classnames( 'carousel-product-list', { 'carousel-product-list--no-arrows': !isAllItemsNotVisible } ) }
      style={ /** @type {React.CSSProperties} */ ( cssCustomVarMap ) }
    >
      {
      showCarousel ? (
        <Splide options={ config }>
          { items.map( ( item, idx ) => (
            <SplideSlide key={ idx } className='item'>
              { render( item ) }
            </SplideSlide>
          ) ) }
        </Splide>
      ) : (
        <div className='carousel-product-list__carousel-hidden'>
          { items.map( ( item, idx ) => (
            <div key={ idx } className='item'>
              { render( item ) }
            </div>
          ) ) }
        </div>
      )
    }
    </div>
  );

};

CarouselProductList.propTypes = {
  items: array,
  render: func,
  viewLimit: number,
  splideConfig: object,
  itemWidth: number,
  containerWidth: number
};
