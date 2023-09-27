import React, { useEffect }  from 'react';
// import { any, func, string } from 'prop-types';
// import { useFormContext } from "react-hook-form";
// import classNames from 'classnames';
import { addPropertyControls, ControlType } from "framer"


const RadioBtnType1Item = ( props ) => {
  // const { name, label, value, labelExt, price, checked, state, onValueChange, setInitialState } = props;
  // const formParameters = useFormContext();
  // const register = formParameters ? formParameters.register : undefined;
  // const checkedClass = classNames( 'radio-btn-type-1', {'radio-btn-type-1--checked': (state === value)} );

  // useEffect( () => {
  //   if (checked) { 
  //     setInitialState(value)
  //   }
  // }, [checked] );

  return (
    <label 
    // className={ checkedClass } 
    >
      RadioBtnType1Item
      {/* <div className='radio-btn-type-1__content'>
        <div>
          <h4 className='radio-btn-type-1__title'>{ label }</h4>
          <h5 className='radio-btn-type-1__description'>{ labelExt }</h5>
        </div>
        <div className='radio-btn-type-1__price'>{ price }</div>
      </div>
      { register ?
          <input
            type='radio'
            value={ value }
            defaultChecked={checked}
            { ...register( name ) }
            onChange={ onValueChange }
          />
        :
          <input
            type='radio'
            value={ value }
            defaultChecked={checked}
            name={ name }
            onChange={ onValueChange }
          />
      }
      <span className='checkmark'></span> */}
    </label>
  );
};

// RadioBtnType1Item.propTypes = {
//   label: string,
//   labelExt: string,
//   value: string,
//   state: string,
//   name: string,
//   checked: any,
//   onValueChange: func,
//   setInitialState: func
// };

export default RadioBtnType1Item;

RadioBtnType1Item.defaultProps = {
  label: "label",
  labelExt: "labelExt",
  value: "value",
  state: "state",
  name: "name",
  // checked: any,
  // onValueChange: func,
  // setInitialState: func
}

addPropertyControls(RadioBtnType1Item, {
  label: {
      title: "label",
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
  name: {
    title: "name",
    type: ControlType.String,
  },
  checked: {
    title: "checked",
    type: ControlType.String,
  },
})
