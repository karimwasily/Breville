import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'
import {
  BREAKPOINT_LG,
  BREAKPOINT_MD,
  BREAKPOINT_SM,
  BREAKPOINT_XL,
  BREAKPOINT_XS,
  BREAKPOINT_XXL,
  BREAKPOINT_XXXL,
} from '../constants'

const getDeviceConfig = width => {
  if (width < BREAKPOINT_XS) {
    return 'xxs'
  } else if (width >= BREAKPOINT_XS && width < BREAKPOINT_SM) {
    return 'xs'
  } else if (width >= BREAKPOINT_SM && width < BREAKPOINT_MD) {
    return 'sm'
  } else if (width >= BREAKPOINT_MD && width < BREAKPOINT_LG) {
    return 'md'
  } else if (width >= BREAKPOINT_LG && width < BREAKPOINT_XL) {
    return 'lg'
  } else if (width >= BREAKPOINT_XL && width < BREAKPOINT_XXL) {
    return 'xl'
  } else if (width >= BREAKPOINT_XXL && width < BREAKPOINT_XXXL) {
    return 'xxl'
  } else if (width >= BREAKPOINT_XXXL) {
    return 'xxxl'
  }
}

export const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(window.innerWidth))

  useEffect(() => {
    const calcInnerWidth = throttle(function () {
      setBrkPnt(getDeviceConfig(window.innerWidth))
    }, 200)
    window.addEventListener('resize', calcInnerWidth)
    return () => window.removeEventListener('resize', calcInnerWidth)
  }, [])

  return brkPnt
}
