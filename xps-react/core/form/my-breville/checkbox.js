import React from 'react'
import { string } from 'prop-types';

import { useFormContext } from "react-hook-form";

export default function Checkbox( props ) {
  const { name, label, readOnly } = props;

  const formParameters = useFormContext();
  const register = formParameters ? formParameters.register : undefined;

  return (
    <div className="form-checkbox-wrap">
      { register ?
          <input
            type="checkbox"
            className='form-checkbox'
            { ...register( name ) }
            readOnly={ readOnly }
          />
          :
          <input
            type="checkbox"
            className='form-checkbox'
            name={ name }
            readOnly={ readOnly }
          />
        }
        <label className="form-checkbox-label" htmlFor={ name }>{ label }</label>
    </div> );
}

Checkbox.propTypes = {
  name: string,
  label: string,
};
