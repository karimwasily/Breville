import React from 'react'
import { node } from 'prop-types'
import { useProvidedProperties } from './useProvidedProperties'

/**
 * HOC to provide AEM config data via 'aemData' attribute and 'appRef' to use elem position on page
 * @param {React.ReactNode} Component in which to provide 'aemData' & 'appRef' props
 * @returns {React.ReactElement}
 */
export const withAem = Component =>
  function withAemComponent(props) {
    const [aemData, ref] = useProvidedProperties()

    return (
      <div ref={ref}>
        {aemData && <Component aemData={aemData} appRef={ref} {...props} />}
      </div>
    )
  }

withAem.propTypes = {
  children: node,
}
