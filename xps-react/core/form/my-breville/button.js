import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import React from "react";
import Button from 'xps-react/core/button';

export default function FormButton(props) {
  const { label, className, children } = props;
  const formParameters = useFormContext();
  const { isValid, isDirty } = formParameters ? formParameters.formState : {};
  const classes = classNames('form-button', className);
  
  return (
    <Button
      label={label}
      disabled={!isValid || !isDirty}
      type={'submit'}
      className={classes}
      textType={'bold'}
    >{label || children}</Button>
  );
}
