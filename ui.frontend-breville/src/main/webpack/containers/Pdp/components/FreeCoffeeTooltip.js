import React from 'react';
import { string } from 'prop-types';
import { InfoTooltip } from 'shared-ui/Tooltip/components/InfoTooltip';

/**
 * Free Coffee Bag Tooltip information
 * @param {object} props props
 * @param {string} props.content content string to place within tooltip
 * @returns {React.ReactElement}
 */
export const FreeCoffeeTooltip = ( { content } ) => {
  // * ID must be different namespace to portal hook otherwise tooltip will break
  return <InfoTooltip id='FreeCoffeeBagTooltip' content={ content } />;
};

FreeCoffeeTooltip.propTypes = {
  content: string
};
