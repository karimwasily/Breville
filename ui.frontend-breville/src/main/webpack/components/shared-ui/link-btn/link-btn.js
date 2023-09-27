import React from 'react';
import { Link } from 'react-router-dom';
import { bool, string, node, oneOfType } from 'prop-types';
import classnames from 'classnames';

/**
 * Button Component
 * @param {{
 * className?: string,
 * children?: string,
 * label?: string,
 * type?: string,
 * size?: string,
 * colorScheme?: string,
 * icon?: string,
 * disabled?: boolean,
 * href: [boolean|string],
 * onClick?: function,
 * isActive?: boolean
 * }}  args
 * @returns
 */

export const LinkBtn = ( { className, children, label, type, size, colorScheme, icon, disabled, href, textType, isActive, ...rest } ) => {

  const classNames = classnames(
    className,
    `react-button react-button--size-${ size }`,
    `react-button react-button--textType-${ textType }`,
    `react-button--type-${ type }`,
    {
      [`react-button--color-scheme-${ colorScheme }`]: !disabled,
      [`react-button__icon--${ icon }`]: icon,
      'react-button--active': isActive
    }
  );

  const isExternal = href.includes( 'https' );
  return isExternal ?
    ( <a className={ classNames } href={ href } { ...rest }>
      { children }
    </a> ) : (
      <Link className={ classNames } to={ href } { ...rest }>
        { children }
      </Link>
    );
};

LinkBtn.propTypes = {
  className: string,
  children: node.isRequired,
  type: string, // "button" (default) or "link"
  size: string, // large, medium (default), small
  textType: string, // text bold, normal
  icon: string,
  href: oneOfType( [bool, string] ),
  disabled: bool, // refer to _cs-svgs.scss, default is none/empty
  colorScheme: string, // black (default), purple, inverted
  isActive: bool
};

LinkBtn.defaultProps = {
  className: '',
  type: 'button',
  size: 'medium',
  textType: 'normal',
  colorScheme: 'green',
  disabled: false,
  href: false
};

export default LinkBtn;
