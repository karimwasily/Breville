import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

const PersonalDetails = ( { pagePath, firstName, lastName, email, phone } ) => {
  return (
    <div className='cmp-mybreville__personal-details'>
      <Link className='cmp-mybreville__link' to={ pagePath }>Personal Details</Link>
      <div className='cmp-mybreville_text'>
        <p> { `${ firstName || '' } ${ lastName || '' }` }</p>
        <p> { email }</p>
        <p> { phone }</p>
      </div>
    </div>
  );
};

PersonalDetails.propTypes = {
  pagePath: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string
};

export default PersonalDetails;
