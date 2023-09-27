import React from 'react';
// import { string } from 'prop-types';
// import classNames from 'classnames';
import { addPropertyControls, ControlType } from "framer"


/**
 * Bazaar voice ratings summary widget
 * @see https://knowledge.bazaarvoice.com/wp-content/conversations-prr/en_US/display/integrating_content_bv_js.html
 * @param {object} props props
 * @param {string} props.variantSKU variant sku id for widget
 * @param {'inline_rating' | 'rating_summary'} props.widgetType visual representation of ratings
 * @param {string} props.className custom className to apply
 * @returns {React.ReactElement}
 */
export const Ratings = ( 
  // { variantSKU, widgetType = 'inline_rating', className = '' } 
  ) => {
  return (
    <div
      // data-bv-show={ widgetType }
      // className={ classNames( 'bazaar-ratings', widgetType, className ) }
      // data-bv-product-id={ variantSKU }
    />
  );
};

// Ratings.propTypes = {
//   variantSKU: string,
//   type: string,
//   className: string
// };

Ratings.defaultProps = {
  variantSKU: "",
  type: "",
  className: ""
}

addPropertyControls(Ratings, {
  text: {
      title: "Text",
      type: ControlType.String,
  },
})