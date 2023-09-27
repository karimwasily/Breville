import React, { useState } from 'react';
import { string } from 'prop-types';

import Hr from 'components/shared-ui/Hr';

const Heading = ( { label } ) => (
  <>
    <h2 className='form-heading'>{ label }</h2>
    <Hr />
  </>
);

Heading.propTypes = {
  label: string
};

export default Heading;
