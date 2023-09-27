/**
 * This method return another method which is responsible
 * to trigger action in the redux
 * @param {String} type Action Type
 * @param  {...any} argNames List of arguments
 * @returns {function}
 */
export const makeActionCreator = ( type, ...argNames ) => ( ...args ) => {

    const payload = {};
    if ( !argNames.length ) return { type, payload: { ...args[0] } };
    argNames.forEach( ( arg, index ) => {

        payload[arg] = args[index];

    } );

    const action = { type, payload };

    return action;

};

/**
 * This method is responsible to create the method for the context menu
 * which will execute the handle method passed to it and also will
 * pass the params to the handler
 * @param {*} id unique key for the row
 * @param {*} handler method with need to be invoked
 * @returns {function}
 */
export const makeContextActions = ( id, handler ) => () => handler( id );

export default makeActionCreator;
