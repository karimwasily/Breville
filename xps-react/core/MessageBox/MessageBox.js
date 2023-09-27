import React from 'react';

const MessageBox = ({ className, label, action }) => {

    return (
      <div className={`message-box ${className}`}>
        <span className='message-box__label'>{ label}</span>
        <span>
          {action}
        </span>
      </div>
    );
  }

export default MessageBox;