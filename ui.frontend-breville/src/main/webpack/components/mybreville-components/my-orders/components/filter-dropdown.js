import React, { useState, useEffect } from 'react';
import { string, func, bool } from 'prop-types';
import classnames from 'classnames';
import Button from 'components/shared-ui/button';

const FilterDropdown = ( { className, filterName, open, onClick } ) => {
  const [isOpen, setOpen] = useState( open );

  useEffect( () => {
    if ( isOpen !== open ) {
      setOpen( open );
    }
  }, [open] );

  function handleButtonClick() {
    if ( onClick && typeof onClick === 'function' ) {
      onClick( filterName );
    }
  }

  const classes = classnames( 'my-orders__filter-dropdown my-orders__filters', className ),
    wrapperClassess = classnames( 'my-orders__filter-controller', {
      'my-orders__filter-controller--active': isOpen
    } );

  return (
    <div className={ classes }>
      <div className={ wrapperClassess }>
        <Button
          className='my-orders__filter-controller-button'
          colorScheme='black'
          onClick={ handleButtonClick }
          size='small'
          type='link'
          linkType='normal'
          textType='bold'
        >
          { filterName } <span className='my-orders__filter-controller-icon' />
        </Button>
      </div>
    </div>
  );
};

FilterDropdown.defaultProps = {
  className: '',
  filterName: 'Filter',
  open: false
};

FilterDropdown.propTypes = {
  className: string,
  filterName: string,
  active: bool,
  onClick: func
};

export default FilterDropdown;