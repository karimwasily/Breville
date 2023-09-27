import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

/** @typedef {'inline_rating' | 'rating_summary' | 'reviews' | 'questions' | 'review_highlights' | 'seller_ratings' } WidgetType  */

/**
 * Bazaar voice ratings summary widget
 * @see https://knowledge.bazaarvoice.com/wp-content/conversations-prr/en_US/display/integrating_content_bv_js.html
 * @param {object} props props
 * @param {string} props.variantSKU variant sku id for widget
 * @param {WidgetType | string} props.widgetType visual representation of ratings
 * @param {string?} [props.className] custom className to apply
 * @param {object?} [props.style] custom style to apply
 * @returns {React.ReactElement}
 */
export const Ratings = ( { variantSKU , widgetType = 'inline_rating', className = '', style = {} } ) => {

  if (!variantSKU) return null

  return (
    <div
      data-bv-show={ widgetType }
      className={ classNames( 'bazaar-ratings', widgetType, className ) }
      data-bv-product-id={ variantSKU }
      style={style}
    />
  );
};

Ratings.propTypes = {
  sku: string,
  type: string,
  className: string
};