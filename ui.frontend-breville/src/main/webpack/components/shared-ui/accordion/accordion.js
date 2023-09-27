import React from 'react';
import Collapse from 'rc-collapse';
import motion from './motion';
import 'rc-collapse/assets/index.css';

function Accordion( { children, ...otherProps } ){

  return (
    <Collapse accordion={ true } { ...otherProps } openMotion={ motion }>
      { children }
    </Collapse>
  );
}

export default Accordion;