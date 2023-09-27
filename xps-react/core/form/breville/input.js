import React from 'react'
import { array, string, any } from 'prop-types';
import classnames from 'classnames';
import { useFormContext } from "react-hook-form";

export default function Input(props) {

  const {
    defaultValue,
    name,
    label,
    type,
    readOnly,
    placeHolder = '',
    validation 
  } = props;

  const formParameters = useFormContext();
  const { errors } = formParameters.formState;
  const isInvalid = errors && errors[name];

  const register = formParameters.register;

  const errorClass = classnames(
    { 'form-control--error-input': isInvalid },
  );

  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={name}>{label}</label>
      <input
        type={type}
        className={`form-control ${errorClass}`}
        { ...register(name, validation ) }
        placeholder={placeHolder}
        readOnly={readOnly}
        defaultValue={defaultValue}
      />
      {isInvalid && <div className="form-error--error-message">{errors[name]?.message}</div>}
    </div>
  );
}

Input.propTypes = {
  args: array,
  name: string,
  label: string,
  type: string,
  defaultValue: string,
  validation: any,
};
