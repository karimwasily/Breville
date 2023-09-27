import React from 'react';
import { array, string } from 'prop-types';
import { useFormContext } from "react-hook-form";

export default function Select(props) {

  const { name, label, options, defaultValue} = props;

  const formParameters = useFormContext();
  const register = formParameters.register;

  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={ name }>{ label }</label>
      <select { ...register( name ) } className='form-select' defaultValue={defaultValue}>
        { options.map( ( { value, label } ) => (
          <option key={ value } value={ value }>{ label }</option>
      ) ) }
      </select>
    </div>
  );
}

Select.propTypes = {
  options: array,
  name: string,
  label: string,
  defaultValue: string
};
