import React from 'react';
import { Link } from "react-router-dom";
import { bool, string, node, oneOfType } from 'prop-types';
import classnames from 'classnames'


/**
 * Button Component
 * @param {{
 * className?: string,
 * children?: string | React.ReactNode,
 * label?: string,
 * type?: string,
 * size?: string,
 * colorScheme?: string,
 * icon?: string,
 * disabled?: boolean,
 * href: [boolean|string],
 * onClick?: function,
 * onKeyPress?: function,
 * isActive?: boolean,
 * style?: React.CSSProperties
 * }}  args
 * @returns 
 */

export const Button = ({ id, className, children, label, type, size, colorScheme, icon, disabled, href, textType, isActive, ...rest }) => {

  const classNames = classnames(
    className,
    `react-button react-button--size-${size}`,
    `react-button react-button--textType-${textType}`,
    `react-button--type-${type}`,
    {
      [`react-button--color-scheme-${colorScheme}`]: !disabled,
      [`react-button__icon--${icon}`]: icon,
      'react-button--active': isActive
    }
  )

  function getButton() {
    return (
      <button id={id} className={classNames} disabled={disabled} type={type} {...rest}>
        {label || children}
      </button>
    );
  }

  function getLink() {

    const isExternal = href.includes('https');
    return isExternal ?
      (<a className={classNames} href={href} {...rest}>
        {children}
      </a>) : (
        <Link className={classNames} to={href} {...rest}>
          {children}
        </Link>
      )
  }

  return href ? getLink() : getButton();
}

Button.propTypes = {
  className: string,
  children: node.isRequired,
  type: string, // "button" (default) or "link"
  size: string, // large, medium (default), small
  textType: string, // text bold, normal
  icon: string,
  href: oneOfType([bool, string]),
  disabled: bool, // refer to _cs-svgs.scss, default is none/empty
  colorScheme: string, // black (default), purple, inverted
  isActive: bool
}

Button.defaultProps = {
  className: '',
  type: 'button',
  size: 'medium',
  textType: 'normal',
  colorScheme: 'green',
  disabled: false,
  href: false,
}

export default Button;
