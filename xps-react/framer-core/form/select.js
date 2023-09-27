import React from 'react';
// import { array, string } from 'prop-types';
// import { useFormContext } from "react-hook-form";
import { addPropertyControls, ControlType } from "framer"


export default function Select(props) {

  const { name, label, options, defaultValue} = props;

  // const formParameters = useFormContext();
  // const register = formParameters ? formParameters.register : undefined;

  return (
    <div className='form-group'>
      select
      {/* <label className='form-label' htmlFor={ name }>{ label }</label>
      { register ?
          <select { ...register( name ) } className='form-select' defaultValue={defaultValue}>
            { options.map( ( { value, label } ) => (
              <option key={ value } value={ value }>{ label }</option>
          ) ) }
          </select>
        :
          <select name={ name } className='form-select'>
            { options.map( ( { value, label } ) => (
              <option key={ value } value={ value }>{ label }</option>
          ) ) }
          </select>
      } */}
    </div>
  );
}

// Select.propTypes = {
//   options: array,
//   name: string,
//   label: string,
//   defaultValue: string
// };

Select.defaultProps = {
  options: [],
  name: "",
  label: "",
  defaultValue: ""
}

addPropertyControls(Select, {
  text: {
      title: "Text",
      type: ControlType.String,
  },
})