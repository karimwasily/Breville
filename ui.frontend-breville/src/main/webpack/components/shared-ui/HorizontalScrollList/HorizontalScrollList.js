import React, { useRef } from 'react';
import { useDragToScroll } from 'shared-ui/HorizontalScrollList/hooks/useDragToScroll';
import { number, oneOfType, shape, string } from 'prop-types';
import { useResponsiveTileSize } from 'shared-ui/HorizontalScrollList/hooks/useResponsiveTileSize';

export function HorizontalScrollList( { children, itemWidth, gutterWidth = 10, tagName } ) {
  const TagName = tagName || 'div';
  const scrollRef = useRef();

  const eventsAttr = useDragToScroll( scrollRef );
  const tileSize = useResponsiveTileSize( itemWidth );

  const getMaxWidth = () => {
    const totalTileWidth = tileSize * Math.min( 3, children.length );
    const totalGutterWidth = gutterWidth * ( Math.min( 3, children.length ) + 1 );

    const maxWidth = totalTileWidth + totalGutterWidth;

    return maxWidth > window.innerWidth ? '100%' : `${ maxWidth }px`;
  };

  const styles = {
    '--tile-size': tileSize ? `${ tileSize }px` : 'auto',
    '--gutter-width': `${ gutterWidth / 2 }px`,
    '--max-width': getMaxWidth()
  };

  return (
    <TagName className='list horizontal-list' ref={ scrollRef } { ...eventsAttr } style={ styles }>
      <div className='horizontal-list__spacer' />
      { children }
      <div className='horizontal-list__spacer' />
    </TagName>
  );
}

HorizontalScrollList.propType = {
  itemWidth: oneOfType( [
    number,
    shape( {
      min: number,
      xs: number,
      sm: number,
      md: number,
      lg: number,
      xl: number,
      xxl: number,
      xxxl: number
    } )
  ] ),
  gutterWidth: number,
  tagName: string
};