// import React from 'react';
import React, { cloneElement } from 'react';
// import { number, object, func, string } from 'prop-types';
// import WhiteTick from 'resources/svgs/white-tick.svg';
// import { SvgIcon } from "../icons";
import Hr from '../hr';
import { addPropertyControls, ControlType } from "framer"
import { Item } from "./";


const AccordionItem = ( 
  { label, index, curIndex, setIndex, children, 
    //Added these, so can edit in Framer
    showEdit, showTick } 
  ) => {
  const isOpen = ( index === curIndex );

  function onEdit() {
    setIndex( index );
  }
  // function onNext() {
  //   setIndex( index + 1 );
  // }

  // let showTick = false;
  // let showEdit = false;

  let headerClass = '';

  if ( index < curIndex ) {
    showTick = true;
    showEdit = true;
    headerClass = 'accordion-item__header--closed';
  }

  if ( index > curIndex ) {
    headerClass = `accordion-item__header--disabled`;
  }

  return (
    <>
      <div className='accordion-item'>
        <div className={ `accordion-item__header ${ headerClass } mb-10` } >
          <div className='accordion-item__title'>
            { showTick && <div className='accordion-item__icon'>
              {/* <WhiteTick className='accordion-item__white-tick' /> */}
              {/* <SvgIcon iconName="tickv2" size="24px" theme="oneFillBlack" colorOneOverride="white" /> */}
            </div>
            }
            <span>{ `${index + 1}. ${label}` }</span>
          </div>
          { showEdit &&
            <span role='button' tabIndex={ 0 } className='accordion-item__edit' onClick={ onEdit } onKeyDown={ onEdit }>edit</span>
          }
        </div>
        <Hr className='my-20' />
        <Item isOpen/>
        {/* <div style={{background:"red", padding: "100px"}}>
          How best to use cloneElement and Children ComponentInstance
        </div> */}
        {/* { cloneElement( children, { index, isOpen, onNext, curIndex } ) } */}
        {/* {children} */}
      </div>
      { isOpen && <Hr /> }
    </>
  );
};

// AccordionItem.propTypes = {
//   label: string,
//   index: number,
//   curIndex: number,
//   children: object,
//   setIndex: func
// };

export default AccordionItem;

AccordionItem.defaultProps = {
  label: "label",
  index: 0,
  showTick: true,
	showEdit: true,
  curIndex: 0,
  children: [],
  // setIndex: func
}

addPropertyControls(AccordionItem, {
  label: {
      title: "Label",
      type: ControlType.String,
  },
  index: {
    title: "Index",
    type: ControlType.Number,
  },
  curIndex: {
    title: "Cur Index",
    type: ControlType.Number,
  },
  showTick: {
		title: "Show Tick",
		type: ControlType.Boolean,
		defaultValue: true,
	},
	showEdit: {
		title: "Show Edit",
		type: ControlType.Boolean,
		defaultValue: true,
	},
  children: {
    type: ControlType.Array,
    control: {
      type: ControlType.ComponentInstance
    },
    maxCount: 1,
  },

})
