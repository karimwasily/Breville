import React, { Children, cloneElement, useEffect, useState } from 'react';
import { array, number, func } from 'prop-types';
import { register } from 'enquire.js';

const Accordion = ( props ) => {
  const { initIndex } = props;
  const [curIndex, setCurIndex] = useState( 0 );

  const setIndex = ( index ) => {
    setCurIndex( index );
  };

  Accordion.callback = setIndex;

  useEffect( () => {
    setCurIndex( initIndex );
  }, [initIndex] );


  return ( <div className='accordion'>
    { Children.map( props.children, ( child ) => cloneElement( child, { curIndex, setIndex } ) ) }
  </div> );
};

Accordion.propTypes = {
  children: array,
  initIndex: number
};

export default Accordion;
