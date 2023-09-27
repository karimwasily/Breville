import React, { Children, cloneElement, useState } from 'react';
import { array, string } from 'prop-types';

const RadioBtnType1 = ( props ) => {
  const { name } = props;
  const [state, setState] = useState( '' );
 
  function onValueChange( event ) {
    setState( event.target.value );
  }

  function setInitialState( value ) {
    setState( value );
  }
  
  return ( <div>
    { Children.map( props.children, ( child ) => cloneElement( child, { name, state, onValueChange, setInitialState } ) ) }
  </div> );
};

RadioBtnType1.propTypes = {
  children: array,
  name: string
};

export default RadioBtnType1;
