import React from 'react';
import { func, bool, string } from 'prop-types';
import classNames from 'classnames';


export const VerticalListMoreButton = ( { toggleShowMore, showMore, label = 'more' } ) => {
  const buttonClass = classNames( 'variant-more', {
    'variant-more--hidden': showMore
  } );

  return (
    <li className='variant-picker__item variant-picker__item-more'>
      <button onClick={ toggleShowMore } className={ buttonClass } >
        { label }
      </button>
    </li>
  );
};

VerticalListMoreButton.propTypes = {
  toggleShowMore: func,
  showMore: bool,
  label: string
};