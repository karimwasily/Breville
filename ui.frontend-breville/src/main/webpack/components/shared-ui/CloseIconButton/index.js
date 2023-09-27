import React from 'react';
import { func, string } from 'prop-types';
import Button from 'components/shared-ui/button';

const CloseIconButton = ( { onClick, className, size = 'medium', ...rest } ) =>
  <div className={ `close-icon-button ${ className }` }>
    <Button title='Close' onClick={ onClick } className={ `close-icon-button__btn close-icon-button__btn--${ size }` } { ...rest }>
      <i className={ `close-icon-button__icon close-icon-button__icon--${ size }` }></i>
    </Button>
  </div>;

CloseIconButton.propTypes = {
  onClick: func,
  className: string,
  size: string
};

export default CloseIconButton;

