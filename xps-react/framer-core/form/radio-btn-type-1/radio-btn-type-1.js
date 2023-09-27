import React, { Children, cloneElement, useEffect, useState } from 'react';
// import { array, string } from 'prop-types';
import { addPropertyControls, ControlType } from "framer"

const RadioBtnType1 = ( props ) => {
  // const { name } = props;
  // const [state, setState] = useState( '' );
 
  // function onValueChange( event ) {
  //   setState( event.target.value );
  // }

  // function setInitialState( value ) {
  //   setState( value );
  // }
  
  return ( <div>
    RadioBtnType1
    {/* { Children.map( props.children, ( child ) => cloneElement( child, { name, state, onValueChange, setInitialState } ) ) } */}
  </div> );
};

// RadioBtnType1.propTypes = {
//   children: array,
//   name: string
// };

export default RadioBtnType1;

RadioBtnType1.defaultProps = {
  children: [],
  name: ""
}

addPropertyControls(RadioBtnType1, {
  children: {
    title: "Children",
    type: ControlType.Array,
},
name: {
      title: "Name",
      type: ControlType.String,
  },
})
