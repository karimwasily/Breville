import { useEffect } from 'react';

/**
 * hook to update text on page dom elems
 * @param {{text: string, selector: string}} args args
 * @returns {void}
 */
export const useUpdateElems = ( { text, selector } ) => {

  useEffect( () => {
    if ( !text ) return;

    // select all the elems which require the price field
    const elems = document.querySelectorAll( selector );
    elems.forEach( ( elem ) => elem.textContent = text );
  }, [text] );

};
