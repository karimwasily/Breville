import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

const ContactPreferences = ( { text, pagePath } ) => {

  return (
    <div className='cmp-mybreville__contact-preference'>
      <Link className='cmp-mybreville__link' to={ pagePath }>Contact Preferences</Link>
      <p className='cmp-mybreville_text'>{ text }</p>
    </div>
  );
};

ContactPreferences.propTypes = {
  pagePath: string,
  text: string
};

export default ContactPreferences;
