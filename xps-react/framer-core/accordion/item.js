import React from 'react';
// import { number, any, func } from 'prop-types';
import { addPropertyControls, ControlType } from "framer"

const Item = ( props ) => {
  const { index, isOpen, onNext } = props;

  if ( !isOpen ) {
    return <div></div>;
  }

  return (
    <>
      <div className='item-new'>
        Item: { index + 1 }
      </div>
      <button className='form-button' onClick={ onNext }>Next</button>
    </>
    
  );
};

// Item.propTypes = {
//   index: number,
//   isOpen: any,
//   onNext: func
// };

export default Item;

Item.defaultProps = {
  index: "Tap",
  isOpen: false,
}

addPropertyControls(Item, {
  index: {
    title: "Index",
    type: ControlType.Number,
		defaultValue: 0,
  },
  text: {
    title: "text",
		type: ControlType.String,
		defaultValue: "Next",
	},
  isOpen: {
    title: "Is Open",
    type: ControlType.Boolean,
    defaultValue: false,
  },
})
