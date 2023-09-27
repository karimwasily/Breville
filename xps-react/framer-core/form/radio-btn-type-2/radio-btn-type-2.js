import React, { Children, cloneElement, useEffect, useState } from 'react';
// import { array, number, string } from 'prop-types';
import { addPropertyControls, ControlType } from "framer"


const RadioBtnType2 = ( props ) => {
  // const { name } = props;
  // const [state, setState] = useState( '0' );
  // const [isOpen, setIsOpen] = useState(false);
 
  // function onValueChange( event ) {
  //   setState( event.target.value );
  //   setIsOpen(true);
  // }

  // function setInitialState( value ) {
  //   setState( value );
  // }

  return ( <div>
    RadioBtnType2
    {/* { Children.map( props.children, ( child ) => cloneElement( child, { state, onValueChange, isOpen, name, setInitialState } ) ) } */}
  </div> );
};

// RadioBtnExt.propTypes = {
//   children: array,
//   initIndex: number,
//   name: string
// };

export default RadioBtnType2;

RadioBtnType2.defaultProps = {
  children: [],
  initIndex: 0,
  name: ""
}

addPropertyControls(RadioBtnType2, {
  children: {
    title: "Children",
    type: ControlType.Array,
},
initIndex: {
  title: "initIndex",
  type: ControlType.Number,
},
name: {
      title: "Name",
      type: ControlType.String,
  },
})