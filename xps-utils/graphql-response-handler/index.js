/**
 * This method will get the graphql response and then
 * validate it returning the proper response or not.
 * @returns {*}
 */
 export const getgraphqlResponse = (response) => {
    const {data:{errors=[], statusCode}={}} ={} = response;

    // ! errors can be null
   if (errors?.length) {
    //  getRefreshToken();
      response.errors = errors;
      response.hasErrors = true
      response.statusCode = statusCode
     return response //error popup can show this place or we can call the refresh token part in this place.
   }else{
     return response;
   }
 };
