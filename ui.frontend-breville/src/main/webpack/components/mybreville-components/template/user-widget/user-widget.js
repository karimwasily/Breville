import React, { useEffect } from 'react';
import { string } from 'prop-types';

/**
 *
 *
 * @param {{firstName: string, lastName: string} UserWidgetArgs
 * @returns {React.ReactElement}
 */

const UserWidget = ( { firstName, lastName } ) => {
  const firstNameInitial = firstName?.charAt( 0 );
  const lastNameInitial = lastName?.charAt( 0 );
  const initials = `${ firstNameInitial }${ lastNameInitial }`;
  let nameError = false;
  if ( !firstName || lastName === 'Breville customer' || lastName === 'Beanz customer' ) {
    nameError = true;
  }
  else {
    nameError = false;
  }

  return (
    <div className='cmp-userwidget'>
      <div className={ `userwidget ${ nameError ? 'userwidget-error' : '' }` }>
        <p className='cmp-text'>{ firstName } { lastName }</p>
        <p className='cmp-circle-text'>{ initials }</p>
      </div>
    </div>
  );
};

UserWidget.propTypes = {
  firstName: string,
  lastName: string
};

export default UserWidget;
