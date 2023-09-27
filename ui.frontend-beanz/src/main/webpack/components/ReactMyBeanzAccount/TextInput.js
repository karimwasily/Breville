/* eslint-disable react/jsx-no-bind */
import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const TextInput = ( props ) => {

  const [isFocused, setIsFocused] = useState( false );
  const [requiredError, setRequiredError] = useState( false );

  const onInputBlur = ( event ) => {
    if ( props.onBlur ){
      props.onBlur( event );
    }
  };

  const onInputFocus = ( event ) => {
    setIsFocused( true );
    if ( props.onFocus ){
      props.onFocus( event );
    }
  };

  const onInputChange = ( event ) => {
    if ( event.target.value === '' ){
      setRequiredError( true );
    }
    else {
      setRequiredError( false );
    }
    if ( props.onChange ){
      props.onChange( event );
    }
  };

  return (
    <div className='cmp-form__myaccount-form-field'>
      <div className= 'cmp-form__myaccount-form-field__control'>
        <label
          htmlFor={ props.id }
          className='cmp-form__myaccount-form-field__label'
        >
          { props.label }
        </label>
        <input
          id={ props.id }
          type={ props.type }
          className= { ( requiredError && isFocused && props.required ) ? 'cmp-form__myaccount-form-field__input cmp-form__myaccount-form-field__control-error' : ( props.ContainerClass === '' && isFocused ) ? 'cmp-form__myaccount-form-field__input' : `cmp-form__myaccount-form-field__input ${ props.containerClass }` }
          onChange={ ( event ) => onInputChange( event ) }
          onBlur={ ( event ) => onInputBlur( event ) }
          onFocus={ ( event )=> onInputFocus( event ) }
          value={ props.value }
          disabled={ props.disabled }
        />
      </div>
      { requiredError && isFocused && props.required && <p className='cmp-form__myaccount-form-field_error-p'>This field is required.</p> }
    </div>
  );


};

TextInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  containerClass: PropTypes.string
};


export default TextInput;