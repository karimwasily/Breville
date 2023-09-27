import React, { useState, useEffect, useRef } from 'react';
import { string, number, bool, func } from 'prop-types';

/**
 * Action Notification Component
 * @param {{
  * className?: string,
  * id?: string,
  * message?: string,
  * isError?: bool
  * duration?: number,
  * closeAction?: func
  * }}  args
  * @returns 
  */

const ActionNotification = ( { className, id, message, isError, duration, closeAction } ) => {

  const componentRef = useRef(null);
  const [show, setShow] = useState( true );

  useEffect( () => {
    if( duration !== 0 ) {
      const timer = setTimeout( () => setShow( false ), duration * 1000 );

      return () => {
        clearTimeout( timer );
      }
    }
    document.addEventListener( 'click', handleClickOutside, false );
    
    return () => {
      document.removeEventListener( 'click', handleClickOutside, false );
    };
  }, []);

  function handleClickOutside ( event ) {
    if ( componentRef.current && !componentRef.current.contains( event.target )) {
      setShow( false );
      closeAction();
    }
  }

  function handleCloseNotification() {
    setShow( false );
    closeAction();
  }

  return show && (
  <div 
    className={ `
      action-notification 
      ${ className || '' } 
      ${ isError ? 'action-notification--error' : 'action-notification--success' }`
    } 
    id={ id }
    ref={ componentRef }
  >
    <span>
      { message }
    </span>
    <span className='action-notification__close-icon'  onClick={ handleCloseNotification }></span>
  </div> );
};

ActionNotification.propTypes = {
  className: string,
  id: string,
  duration: number,
  closeAction: func,
  message: string.isRequired,
  isError: bool.isRequired
};

ActionNotification.defaultProps = {
  closeAction: () => void(0),
  duration: 0
};

export default ActionNotification;
