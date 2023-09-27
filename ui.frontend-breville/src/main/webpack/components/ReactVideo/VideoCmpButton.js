import React from 'react';
import { node, string, func } from 'prop-types';

/**
 * Based on aem core button v2 (icon) component 
 * 
 * @param {{ children?: React.ReactChildren | string, onClick: React.MouseEventHandler, className?: string }} CmpButtonArgs 
 * @returns {React.ReactElement}
 */
const VideoCmpButton = ({ children = '', onClick, className='cmp-reactvideo-button' }) => (
  <div onClick={onClick} className={`button ${className}`}>
    <button type="button" className="cmp-button" aria-label="Video Component Button">
      <span className="cmp-button__icon"></span>
      <span className="cmp-button__text">{children}</span>
    </button>
  </div>
);

VideoCmpButton.propTypes = {
  children: node,
  className: string,
  onClick: func.isRequired,
};

export { VideoCmpButton };
