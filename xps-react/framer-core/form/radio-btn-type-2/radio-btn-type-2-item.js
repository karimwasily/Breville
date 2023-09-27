import React, { useEffect } from 'react';
// import classNames from 'classnames';
// import { useFormContext } from "react-hook-form";
// import { func, string, any } from 'prop-types';
import { addPropertyControls, ControlType } from "framer"


const RadioBtnType2Item = ( props ) => {
  // const { name, state, checked, value, label, labelExt, lnk, onValueChange, isOpen, children, setInitialState } = props;
  // const formParameters = useFormContext();
  // const register = formParameters ? formParameters.register : undefined;
  // const editClass = classNames({'radio-btn-type-2__lnk': true, 'radio-btn-type-2__lnk--edit': (lnk === 'Edit')});
  // const checkedClass = classNames({'radio-btn-type-2': true, 'radio-btn-type-2--checked': (value === state)});

  // let showContent = false;

  // if (isOpen && (value === state)) {
  //   showContent = true;
  // }

  // useEffect( () => {
  //   if (checked) { 
  //     setInitialState(value)
  //   }
  // }, [checked] );

  return (
    <>
    RadioBtnType2Item
    {/* <label className={checkedClass}>
      <div className='radio-btn-type-2__content'>
        <div className='radio-btn-type-2__label'>
          <h4 className='radio-btn-type-2__title'>{ label }</h4>
          { !showContent && <h5 className='radio-btn-type-2__description'>{ labelExt }</h5> }
        </div>
        { !showContent && <div className={editClass}>{lnk}</div> }
      </div>
      <input
        type='radio'
        value={ value }
        defaultChecked={checked}
        { ...register( name ) }
        onChange={ onValueChange }
        onClick={ onValueChange }
      />
      <span className='checkmark'></span>
      { showContent && <div className="pt-20" >{ children }</div> }
    </label> */}
    </>
  );
};

// RadioBtnExtItem.propTypes = {
//   label: string,
//   labelExt: string,
//   value: string,
//   state: string,
//   lnk: string,
//   onValueChange: func,
//   isOpen: any,
//   name: string
// };

export default RadioBtnType2Item;

RadioBtnType2Item.defaultProps = {
  label: "label",
  labelExt: "labelExt",
  value: "value",
  state: "state",
  lnk: "lnk",
  // onValueChange: func,
  isOpen: false,
  name: "name",
}

addPropertyControls(RadioBtnType2Item, {
  text: {
      title: "Text",
      type: ControlType.String,
  },
  labelExt: {
    title: "labelExt",
    type: ControlType.String,
},
value: {
  title: "value",
  type: ControlType.String,
},
state: {
  title: "state",
  type: ControlType.String,
},
isOpen: {
  title: "isOpen",
  type: ControlType.Boolean,
},
name: {
  title: "name",
  type: ControlType.String,
},
})