import React, { useState } from 'react';
import { string, bool, node, func } from 'prop-types';

const AccordionCollapse = ( { className, collapseOnLoad, title, children, onClickAction } ) => {

  const [ isOpen, setIsOpen ] = useState( !collapseOnLoad );

  function toggleOpen() {
    setIsOpen( !isOpen );
    onClickAction();
  }

  return ( 
  <div className={ `accordion-collapse ${ className || '' } ${ isOpen ? 'accordion-collapse--open' : 'accordion-collapse--collapse'} ` }>
    { isOpen === false && <h3 className='accordion-collapse__title'>{ title }</h3> }
    <button className='accordion-collapse__button' onClick={ toggleOpen }>
      { isOpen ? 'Hide' : 'Show' }
    </button>
    { isOpen && children }
  </div> );
};

AccordionCollapse.propTypes = {
  className: string,
  collapseOnLoad: bool,
  title: string,
  children: node,
  onClickAction: func
};

AccordionCollapse.defaultProps = {
  collapseOnLoad: false,
  onClickAction: () => void(0)
};

export default AccordionCollapse;
