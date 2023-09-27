import React from 'react';
import { node, func, bool } from 'prop-types';
import classNames from 'classnames';

export const Tab = ( { currentTab, onClick, isActive, children } ) => {
  return (
    <div className={ classNames( 'coffee-conf-tab__item-wrapper', { active: isActive } ) }>
      <button
        onClick={ onClick }
        data-index={ currentTab }
        className='coffee-conf-tab__item'
      >
        { children }
      </button>
    </div>
  );
};

Tab.propTypes = {
  children: node,
  onClick: func,
  isActive: bool
};