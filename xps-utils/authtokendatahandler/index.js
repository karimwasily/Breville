/**
 * This method will get the graphql response and then
 * validate it returning the proper response or not.
 * @returns {*}
 */

 export const getauthemail = (response) => {
   let authjson = '';
   let user_email;
   let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        if(keys[i].includes('@@auth')){
        values.push( localStorage.getItem(keys[i]) );
        authjson = localStorage.getItem(keys[i]) 
        }
    }
    
    if(authjson!==null && authjson!=='' && authjson!==undefined){
        let authObj =JSON.parse(authjson);
        if(authObj.body.id_token){
            localStorage.setItem('auth_token',authObj.body.id_token);
        }
        if(authObj.body.decodedToken.claims.email){
            // localStorage.setItem('user_email',authObj.body.decodedToken.claims.email);
            user_email  = authObj.body.decodedToken.claims.email;
        }
    }

    return user_email;
 };

  export const getauthtoken = (response) => {
    let authjson = '';
    let user_authtoken;
    let values = [],
         keys = Object.keys(localStorage),
         i = keys.length;
 
     while ( i-- ) {
         if(keys[i].includes('@@auth')){
         values.push( localStorage.getItem(keys[i]) );
         authjson = localStorage.getItem(keys[i]) 
         }
     }
     
     if(authjson!==null && authjson!=='' && authjson!==undefined){
         let authObj =JSON.parse(authjson);
         if(authObj.body.id_token){
             localStorage.setItem('auth_token',authObj.body.id_token);
             user_authtoken = authObj.body.id_token;
         }

     }
 
     return user_authtoken;
  };

  export const getemailVerified = (response) => {
    let authjson = '';
    let email_verified;
    let values = [],
         keys = Object.keys(localStorage),
         i = keys.length; 
 
     while ( i-- ) {
         if(keys[i].includes('@@auth')){
         values.push( localStorage.getItem(keys[i]) );
         authjson = localStorage.getItem(keys[i]) 
         }
     }
     
     if(authjson!==null && authjson!=='' && authjson!==undefined){
         let authObj =JSON.parse(authjson);
         if(authObj.body.decodedToken.user.email_verified){
             localStorage.setItem('email_verified', authObj.body.decodedToken.user.email_verified );
             email_verified = authObj.body.decodedToken.user.email_verified;
         }
    }
 
     return email_verified;
  };
 
export const setAuthData = async() => {
    const localStore = Object.entries(localStorage);
    localStore.forEach(function (val, i) {
        if (val[0].includes('auth0spa')) {
            const authDataBody = (JSON.parse(val[1]).body);
            const authToken = authDataBody.id_token;
            const auth_username = authDataBody.decodedToken?.user?.nickname;
            localStorage.setItem('access_token', authToken);
            localStorage.setItem('auth_username', auth_username);
            localStorage.setItem('userWelcomed', true);
        }
    });
}