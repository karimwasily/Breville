// import { useFormContext } from "react-hook-form";
import React, { useEffect } from "react";
import Button from 'xps-react/framer-core/button';
import { addPropertyControls, ControlType } from "framer"


export function FormButton(props) {
  const { label, children, callback } = props;

  // const formParameters = useFormContext();
  // const { isValid, isDirty } = formParameters ? formParameters.formState : {};
  
  // useEffect(() => {
  //   if (callback) {
  //     callback(isValid, isDirty);
  //   }
  // }, [isValid, isDirty]);

  return (
    <Button
      label={label}
      // disabled={!isValid || !isDirty}
      type={'submit'}
      className={'form-button'}
      textType={'bold'}
    >
     ZZZ
      {/* {label || children} */}
    </Button>
  );
}


export default FormButton;

FormButton.defaultProps = {
  //get them from import?
}


addPropertyControls(FormButton, {
  //get them from import?
})