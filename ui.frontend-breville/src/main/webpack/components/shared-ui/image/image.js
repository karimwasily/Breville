import React from 'react';
import { string, bool } from 'prop-types';
import { getValidElementProps } from 'xps-utils/html-valid-props';
import classNames from 'classnames';
import './index.scss';

/**
 * @typedef {object} ImageCustomProps
 * @property {string} src image src
 * @property {string} [alt] image alt
 * @property {boolean} [isThumbnail] use thumbnail style
 * @property {string} [className] image classes
 *
 * @typedef {ImageCustomProps & React.ImgHTMLAttributes} ImageProps
 */

/**
 * image component
 * @param {ImageProps} props props
 * @returns {React.ReactElement}
 */
export const Image = ( { src, alt = '', isThumbnail = false, className = '', ...otherProps } ) => {
  const imgProps = getValidElementProps( 'img', otherProps );

  const classList = classNames( className, {
    'img-thumbnail': isThumbnail
  } );

  return (
    <img className={ classList } src={ src } alt={ alt } { ...imgProps } />
  );
};

Image.propTypes = {
  src: string,
  alt: string,
  className: string,
  isThumbnail: bool
};