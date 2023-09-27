// {"key": "baristaSeries"}

export const bundleCategoryQuery = `
  query ($key:String){
    category(key: $key){
      id
      key
    }
  }
`;