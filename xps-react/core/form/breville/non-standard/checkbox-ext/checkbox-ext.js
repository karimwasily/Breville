// Checkbox without label
import React from 'react'
import { string } from 'prop-types';

import { useFormContext } from "react-hook-form";

export default function CheckboxExt( props ) {
  const { name, readOnly } = props;

  const formParameters = useFormContext();
  const register = formParameters.register;

  return (
    <div className="form-checkbox-wrap">
      <input
        type="checkbox"
        className='form-checkbox'
        { ...register( name ) }
        readOnly={ readOnly }
      />
    </div> );
}

CheckboxExt.propTypes = {
  name: string,
};
