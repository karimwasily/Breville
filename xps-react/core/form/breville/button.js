import { useFormContext } from "react-hook-form";
import React, { useEffect } from "react";
import Button from 'xps-react/core/button';

export default function FormButton(props) {
  const { label, children, id } = props;

  const formParameters = useFormContext();
  const { isValid } = formParameters.formState;
  
  return (
    <Button
      label={label}
      disabled={!isValid}
      type={'submit'}
      className={'form-button'}
      textType={'bold'}
      id={id}
    >{label || children}</Button>
  );
}
