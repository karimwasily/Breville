import { useEffect, useRef, useState } from 'react'

/**
 * check if we have valid stringified JSON data
 * * this is a rather loose check
 *
 * @param {string} rawProperties
 * @returns {boolean}
 */
const isJSONString = rawProperties => {
  if (typeof rawProperties !== 'string') {
    return false
  }
  const raw = rawProperties.trim()
  return raw && raw[0] === '{' && raw[raw.length - 1] === '}'
}

/**
 * parse the JSON payload which is embeded between script tags
 *
 * @param {HTMLElement} elem
 * @returns {object} - object of initial provided properties
 */
const parseProperties = elem => {
  // * we go one element higher since 'elem' (react app) is appended after script tag as a sibling
  const scriptElem = elem.parentElement.querySelector(
    'script[type="application/json"]'
  )
  const rawProperties = scriptElem?.innerHTML
  const properties = isJSONString(rawProperties)
    ? JSON.parse(rawProperties)
    : {}

  // remove script elem
  // if (scriptElem) scriptElem.remove()

  return { ...properties, ...elem.dataset }
}

/**
 * retrieve inner html of template tag
 *
 * @param {HTMLElement} elem
 * @returns {HTMLCollection} - react object to setinnerHTML of template tag
 */
const getTemplateHTMLCollection = elem => {
  const templateElem = elem.parentElement.querySelector('template')
  const htmlCollection = templateElem?.content.children || null
  // remove template element
  if (templateElem) templateElem.remove()
  return htmlCollection
}

/**
 * remove aem placeholder to show during author mode when react app has not mounted
 * @param {HTMLElement} elem 
 * @returns {void}
 */
const removeAemPlaceholder = elem => {
  const placeholderElem = elem.parentElement.parentElement.querySelector('[data-react-app-placeholder]')
  if (placeholderElem) placeholderElem.remove()
}

/**
 * get aem provided properties for the react app
 *
 * @param {reactProps?: null | object, {verbose?: boolean}} args
 * @returns {[object, React.MutableRefObject, React.SetStateAction<object>]}
 */
export const useProvidedProperties = (
  reactProps = null,
  { verbose = false } = {}
) => {
  const ref = useRef(null)
  const [data, setData] = useState(reactProps)

  // listen for when ref is mounted
  useEffect(() => {
    if (ref === null) return

    // elem which this react app is mounted
    const elem = ref.current

    // remove temporary aem placeholder
    removeAemPlaceholder(elem)

    // grab data properties provided
    const aemProperties = parseProperties(elem)

    // grab nested html provided by aem
    // if there is template data then add it to the state
    const templateData = getTemplateHTMLCollection(elem)
    if (templateData) aemProperties.templateHTMLCollection = [...templateData]

    if (verbose) console.log({ aemProperties })

    // on mount set the initial state comprising of passed props, aemData, and any template data
    setData(state => ( 
      state ? {...state, ...aemProperties} : aemProperties
  ))
  }, [ref])

  return [data, ref, setData]
}
