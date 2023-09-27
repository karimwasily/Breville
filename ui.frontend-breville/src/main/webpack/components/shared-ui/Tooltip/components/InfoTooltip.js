import React from 'react';
import { Tooltip } from '../Tooltip';

/**
 * Info tooltip
 * @param {object} props props
 * @param {string} props.id id
 * @param {string} props.content content within the tooltip
 * @param {string} [props.wrapperTag] wrapper tag element
 * @returns {React.ReactElement}
 */
export const InfoTooltip = ( { id, content } ) => {
  return (
    <Tooltip
      id={ id }
      tooltipContent={ content }
    >
      <span className='info-icon'></span>
    </Tooltip>
  );
};