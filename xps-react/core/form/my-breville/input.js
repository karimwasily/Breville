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
    fieldInformation = '',
    validation = {} ,
    prefix,
    toConfirm
  } = props;

  const formParameters = useFormContext();
  const register = formParameters ? formParameters.register : undefined;
  const getValues = formParameters ? formParameters.getValues : () => {};
  const { errors } = formParameters ? formParameters.formState : {};
  const isInvalid = errors && errors[name];

  const errorClass = classnames(
    { 'form-control--error-input': isInvalid },
  );

  const eitherValidation = 
    toConfirm ? 
    {
      ...validation,  
      validate: (value) => value === getValues(toConfirm) || validation.confirmMatch
    } 
    : validation;

  //Todo: more elegant rendering solution to be fixed. Bug: change of input validation status triggers input focus lost

  // const ConditionalWrapper = ({ condition, wrapper, children }) => condition ? wrapper(children) : children;

  // const InputPrefixWrapper = ({ children }) => {
  //   return (
  //     <div className={`form-control__prefix-wrapper ${errorClass}`}>
  //       <span className='form-control--prefix'>{prefix}</span>
  //       {children}
  //     </div>
  //   );
  // };

  // <ConditionalWrapper condition={prefix} wrapper={children => <InputPrefixWrapper>{children}</InputPrefixWrapper>}>
  //  {input}
  //</ConditionalWrapper>

  const input = register ?
    <input
      type={type}
      className={`form-control ${errorClass}`}
      {...register(name, eitherValidation)}
      placeholder={placeHolder}
      readOnly={readOnly}
      defaultValue={defaultValue}
      fieldinformation={fieldInformation}
    />
    :
    <input
      type={type}
      className='form-control'
      name={name}
      placeholder={placeHolder}
      readOnly={readOnly}
      defaultValue={defaultValue}
      fieldinformation={fieldInformation}
    />;

  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={name}>{label}</label>

      {prefix ?
        <div className={`form-control__prefix-wrapper ${errorClass}`}>
          <span className='form-control--prefix'>{prefix}</span>
          {input}
        </div>
        :
        input
      }
      <div className="form-control-information">{ fieldInformation }</div>
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
  fieldInformation: string,
  prefix: string,
  toConfirm: string,
  placeHolder: string
};
