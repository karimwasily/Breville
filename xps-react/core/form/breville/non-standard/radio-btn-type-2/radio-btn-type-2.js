import React, { Children, cloneElement, useEffect, useState } from 'react';
import { array, number, string } from 'prop-types';

const RadioBtnExt = ( props ) => {
  const { name } = props;
  const [state, setState] = useState( '0' );
  const [isOpen, setIsOpen] = useState(false);
 
  function onValueChange( event ) {
    setState( event.target.value );
    setIsOpen(true);
  }

  function setInitialState( value ) {
    setState( value );
  }

  return ( <div>
    { Children.map( props.children, ( child ) => cloneElement( child, { state, onValueChange, isOpen, name, setInitialState } ) ) }
  </div> );
};

RadioBtnExt.propTypes = {
  children: array,
  initIndex: number,
  name: string
};

export default RadioBtnExt;
