import React from 'react';
import { string } from 'prop-types';

import Button from 'shared-ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { comparisonToggle } from 'library/store/global/actions';
import { selectIsComparing } from 'library/store/global/selector';

/**
 * ComparisonToggle Button
 * @params {{
 * className?: string,
 * btnSize?: string,
 * }} args
 * @returns {React.ReactElement}
 */
export const ComparisonToggle = ( { className = '', btnSize = 'small' } ) => {
  const dispatch = useDispatch();
  const isComparing = useSelector( selectIsComparing );

  const handleClick = () => {
    dispatch( comparisonToggle() );
  };

  // * hide comparison toggle when we are not comparing
  if ( isComparing ) {
    return null;
  }

  return (
    <Button
      size={ btnSize }
      colorScheme='black'
      icon='compare'
      onClick={ handleClick }
      className={ className }
      isActive={ isComparing }
    >
      Compare
    </Button>
  );
};

ComparisonToggle.defaultProps = {
  btnSize: 'small',
  className: ''
};

ComparisonToggle.propTypes = {
  btnSize: string,
  className: string
};
