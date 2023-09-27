import React from 'react'
import { string, node } from 'prop-types'

export const Flex = ({ className = '', children }) => {
  return <div className={`react-flex ${className}`}>{children}</div>
}

Flex.propTypes = {
  className: string,
  children: node,
}
