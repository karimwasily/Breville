import React, { useReducer, useEffect } from 'react';
import { string, number, array, func } from 'prop-types';
import classNames from 'classnames';
import { getValidElementProps } from 'xps-utils/html-valid-props';
import { validate } from './validators';
const inputReducer = ( state, action ) => {
  switch ( action.type ) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate( action.value, action.validators )
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      };
    case 'FOCUS':
      return {
        ...state,
        isFocused: true
      };
    default:
      return state;
  }
};
export const Input = ( props ) => {
  const [inputState, dispatch] = useReducer( inputReducer, props.type === 'checkbox' ? true : { value: props.initialValue || '', isValid: props.initialValid || false, isTouched: false, isFocused: false } );
  const { label, onChange, id, element, validators, errorMessage, options } = props;
  const commonProps = { onChange: changeHandler, value: inputState.value, onBlur: touchHandler, onFocus: focusHandler };
  const inputProps = getValidElementProps( 'input', props );
  const { value, isValid } = inputState;
  const validationClass = classNames( {
    invalid: !inputState.isValid && ( inputState.isTouched || props.isTouched ) && validators.length > 0
  } );
  const labelClass = classNames( {
    label_absolute: ( !inputState.isFocused && inputState.value === '' )
  } );
  useEffect( () => {
    onChange( id, value, isValid );
  }, [id, onChange, isValid, value] );
  function changeHandler( event ) {
    const inputValue = props.type === 'checkbox' ? event.target.checked : event.target.value;
    dispatch( { type: 'CHANGE', value: inputValue, validators: validators } );
  }
  function focusHandler( event ) {
    dispatch( { type: 'FOCUS' } );
  }
  function touchHandler( event ) {
    dispatch( { type: 'TOUCH' } );
    if ( event.target.value === '' ) {
      inputState.isFocused = false;
    }
  }
  const elementType = element === 'textarea' ? <textarea className='cmp-form__checkout--form-textarea' { ...inputProps } rows={ rows || 3 } { ...commonProps } /> : element === 'select' ?
    <select className='select' { ...inputProps } { ...commonProps }>
      { options.map( ( { value, label } ) => (
        <option key={ value } value={ value }>{ label }</option>
      ) ) }
    </select> : <input className='cmp-form__checkout--form-input' { ...inputProps } { ...commonProps } />;
  return (
    <div className={ `cmp-form__checkout--form-control ${ validationClass }` }>
      <label htmlFor={ id } className={ `cmp-form__checkout--form-label ${ labelClass } ` }>{ label }</label>
      { elementType }
      { !inputState.isValid && ( inputState.isTouched || props.isTouched ) && validators.length > 0 && <p className='cmp-form__error-message'>{ errorMessage }</p> }
    </div>
  );
};
Input.propTypes = {
  id: string,
  name: string,
  rows: number,
  type: string,
  placeholder: string,
  label: string,
  element: string,
  errorMessage: string,
  validators: array,
  onChange: func
};