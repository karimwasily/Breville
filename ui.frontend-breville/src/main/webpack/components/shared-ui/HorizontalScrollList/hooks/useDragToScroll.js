import { useEffect, useRef, useState } from 'react';

export function useDragToScroll( ref ) {
  const posRef = useRef();

  const [listeners, setListeners] = useState( {
    onMouseUp: null,
    onMouseDown: null,
    onMouseMove: null
  } );

  const [pos, setPos] = useState( { left: 0, x: 0 } );

  /**
   * Toggle the mouse cursor between "grab" and "grabbing" state based on user's interaction
   *  @param {'hold' | 'release'} state the new "state" of the cursor
   */
  const toggleMouseCursor = ( state ) => {
    if ( !( ref && ref.current ) ) return;

    if ( ref.current.scrollWidth < window.innerWidth ) return;

    if ( state === 'hold' ) {
      ref.current.style.cursor = 'grabbing';
    }
    else if ( state === 'release' ) {
      ref.current.style.cursor = 'grab';
    }
  };

  const removeDragListener = () => {
    setListeners( ( listeners ) => {
      return { ...listeners, onMouseMove: null };
    } );

    toggleMouseCursor( 'release' );
  };

  const onDragStart = ( e ) => {
    setListeners( ( listeners ) => {
      return { ...listeners, onMouseUp: removeDragListener };
    } );

    const { left, x } = posRef.current;

    ref.current.scrollLeft = left - e.pageX + x;
  };
  const mouseDownHandler = ( e ) => {
    if ( !( e && ref && ref.current ) ) return;
    e.preventDefault();

    setPos( {
      left: ref.current.scrollLeft,
      x: e.pageX
    } );

    setListeners( ( listeners ) => {
      return { ...listeners, onMouseMove: onDragStart };
    } );

    toggleMouseCursor( 'hold' );
  };

  useEffect( () => {
    setListeners( ( listeners ) => {
      return { ...listeners, onMouseDown: mouseDownHandler };
    } );

    toggleMouseCursor( 'release' );
  }, [] );

  useEffect( () => {
    document.addEventListener( 'mouseleave', removeDragListener );
    return () => document.removeEventListener( 'mouseleave', removeDragListener );
  }, [] );

  useEffect( () => {
    posRef.current = pos;
  }, [pos] );

  return listeners;
}