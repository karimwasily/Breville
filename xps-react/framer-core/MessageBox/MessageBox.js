import React from 'react';
import { addPropertyControls, ControlType } from "framer"


const MessageBox = (
  // { className, label, action }
  ) => {

    return (
      <div className={`message-box danger`}>
        <span className='message-box__label'>this is default message</span>
        <span>
          {/* {action} */}
        </span>
      </div>
      // <button>This is test button</button>
    );
  }

export default MessageBox;

MessageBox.defaultProps = {
  text: "Tap",
}

addPropertyControls(MessageBox, {
  text: {
      title: "Text",
      type: ControlType.String,
  },
})