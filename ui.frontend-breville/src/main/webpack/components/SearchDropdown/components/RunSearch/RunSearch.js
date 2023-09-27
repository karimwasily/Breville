import React, { useEffect, useRef, useState } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ( { currentRefinement, isSearchStalled, refine, charStart = 3, placeholder = 'Search', onSubmit } ) => {
  const [query, setQuery] = useState( '' );
  const initRef = useRef( false );

  // * only start search after charSet length after which search is enabled permanently
  useEffect( () => {
    if ( initRef.current || query.length >= charStart ) {
      refine( query );

      if ( !initRef.current ) initRef.current = true;
    }
  }, [query] );

  function handleChange( event ) {
    setQuery( event.currentTarget.value );
  }

  function handleSubmit( query ) {
    return function ( event ) {
      event.preventDefault();
      onSubmit( query );
    };
  }

  return (
    <form className='run-search__form' noValidate action='' role='search' onSubmit={ handleSubmit( query ) }>
      <input
        className='run-search__input'
        type='search'
        value={ query }
        onChange={ handleChange }
        placeholder={ placeholder }
      />
    </form>
  );
};

export const RunSearch = connectSearchBox( SearchBox );