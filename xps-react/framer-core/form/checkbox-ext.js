// Checkbox without label
import React from 'react'
// import { string } from 'prop-types';

// import { useFormContext } from "react-hook-form";
import { addPropertyControls, ControlType } from "framer"


export default function CheckboxExt( props ) {
  const { name, readOnly } = props;

  // const formParameters = useFormContext();
  // const register = formParameters ? formParameters.register : undefined;

  return (
    <div className="form-checkbox-wrap">
      CheckboxExt
      {/* { register ?
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
        } */}
    </div> );
}

// CheckboxExt.propTypes = {
//   name: string,
// };

CheckboxExt.defaultProps = {
  name: "name",
}

addPropertyControls(CheckboxExt, {
  name: {
      title: "name",
      type: ControlType.String,
  },
})