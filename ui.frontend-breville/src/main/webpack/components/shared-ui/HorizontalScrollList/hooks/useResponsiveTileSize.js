import { useEffect, useState } from 'react';
import { number, oneOfType, shape } from 'prop-types';

const SCREEN_SIZE = {
  min: 0,
  xs: 375,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  xxxl: 1920
};

export function useResponsiveTileSize( itemWidth ) {
  const [tileSize, setTileSize] = useState( 0 );

  const getTileSize = () => {
    if ( !itemWidth ) return;

    if ( typeof itemWidth === 'number' ) {
      return setTileSize( itemWidth );
    }

    const screenWidth = window.innerWidth;

    let _tileSize = 0;
    for ( const size of Object.keys( SCREEN_SIZE ) ) {
      if ( !itemWidth[size] ) continue;
      if ( screenWidth >= SCREEN_SIZE[size] ) {
        _tileSize = itemWidth[size];
      }
    }

    setTileSize( _tileSize );
  };

  useEffect( () => {
    getTileSize();
    window.addEventListener( 'resize', getTileSize );
    return () => window.removeEventListener( 'resize', getTileSize );
  }, [] );

  return tileSize;
}

useResponsiveTileSize.propType = {
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
  ] )
};