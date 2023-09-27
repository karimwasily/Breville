import {
  func,
  bool,
  node
} from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { keypressEnterSpace } from 'xps-utils/wcag/keypressEnterSpace';

export const SelectWrapper = ( {
  handleSelect,
  isSelected,
  disable,
  children
} ) => {
  const { t } = useTranslation();

  function handleKeypress( event ) {
    keypressEnterSpace( event, handleSelect );
  }

  if ( disable ) return children;

  return (
    <div
      className={ classNames( 'select-wrapper__list-item', {
        'select-wrapper__list-item--selected': isSelected
    } ) }
      onClick={ handleSelect }
      role='button'
      tabIndex={ 0 }
      onKeyPress={ handleKeypress }
    >
      <div className='select-wrapper__header'>
        <div className='select-wrapper__header-text'>{ isSelected ? t( 'br-selected' ) : t( 'br-select' ) }</div>
        <div className='select-wrapper__header-circle'></div>
      </div>

      { children }

      <div className='select-wrapper__footer'>
        <div className='select-wrapper__footer-text'>{ isSelected ? t( 'br-selected' ) : t( 'br-select' ) }</div>
        <div className='select-wrapper__footer-circle'></div>
      </div>
    </div>
  );
};

SelectWrapper.propTypes = {
  handleSelect: func,
  isSelected: bool,
  children: node
};
