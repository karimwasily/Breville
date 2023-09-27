import { useLayoutEffect, useState } from 'react';
import { useWindowSize } from 'xps-utils/useWindowSize';

export const useShowCarousel = ( { minItemWidth, maxContainerWidth, numItems, gap } ) => {
  const [isCarouselVisible, setIsCarouselVisible] = useState( false );
  const { width: windowWidth } = useWindowSize();

  // num of items + gap + gutter > fits > no carousel
  useLayoutEffect( () => {
    if ( !windowWidth || numItems < 2 ) return;

    const totalItemsWidth = numItems * minItemWidth;
    const totalGaps = ( numItems - 1 ) * gap;
    const totalWidth = totalItemsWidth + totalGaps;

    setIsCarouselVisible( totalWidth > windowWidth || totalWidth > maxContainerWidth );

  }, [windowWidth] );


  return isCarouselVisible;
};
