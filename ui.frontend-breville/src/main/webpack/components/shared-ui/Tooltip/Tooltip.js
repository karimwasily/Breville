import React, { useEffect } from 'react';
import { string, node, object, bool } from 'prop-types';
import ReactTooltip from 'react-tooltip'; //

/** @type {import('react-tooltip').TooltipProps} reactTooltipProps */

/**
 * Tooltip component
 * @see https://www.npmjs.com/package/react-tooltip - api reference
 * @params {{
 * id: string
 * place: 'top' | 'left' | 'bottom' | 'right',
 * wrapper: 'div' | 'span',
 * html: 'false' | 'true',
 * reactTooltipConfig?: reactTooltipProps
 * }} props props
 * @returns {React.ReactElement}
 */
export const Tooltip = ( {
  className = 'default-tooltip',
  id,
  place = 'bottom',
  type = 'light',
  event = 'click',
  globalEventOff = 'click',
  html = false,
  tooltipContent,
  wrapper = 'span',
  children,
  reactTooltipConfig = {}
} ) => {

  function handleClose() {
    ReactTooltip.hide();
  }

  // safely fail tooltip if required config is not present
  if ( !id || !tooltipContent ) {
    return children;
  }

  return (
    <span className='tooltip'>
      <TooltipElem wrapper={ wrapper } dataFor={ id }>{ children }</TooltipElem>
      <ReactTooltip
        className= { className }
        id={ id }
        place={ place }
        type={ type }
        event={ event }
        globalEventOff={ globalEventOff }
        html={ html }
        clickable
        wrapper={ wrapper }
        { ...reactTooltipConfig }
      >
        { tooltipContent }
      </ReactTooltip>
    </span>
  );
};

Tooltip.propTypes = {
  className: string,
  id: string,
  place: string,
  type: string,
  event: string,
  globalEventOff: string,
  html: bool,
  tooltipContent: string,
  wrapper: string,
  reactTooltipConfig: object,
  children: node
};

//* tooltip wrapper allows swapping between 'div' and 'span' usage
const TooltipElem = ( { wrapper, dataFor, className, style, children } ) => {
  const commonProps = {
    ['data-for']: dataFor,
    ['data-tip']: true,
    style,
    className
  };
  return ( wrapper === 'div' ? <><div { ...commonProps }>{ children }</div></> : <><span { ...commonProps }>{ children }</span></> );
};
TooltipElem.proptTypes = {
  wrapper: string,
  dataFor: string,
  children: node,
  style: object,
  className: string
};
