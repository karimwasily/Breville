// {"key": "dynamicBundleCategory","locale": "en-US"}

export const getDynamicBundleProductCategoriesQuery = `
  query ($locale:Locale){
    category (key: "dynamicBundleCategory") {
      id
      key
      
      children {
        id
        key
        name (locale:$locale)
        description (locale:$locale)

        custom {
          customFieldsRaw {
            name
            value
          }
        }
      }
    }
  }
`;
