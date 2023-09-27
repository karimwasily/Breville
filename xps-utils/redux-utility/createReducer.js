import { createPayloadHandler, createUpdateHandler } from './handler';

/**
 * Create the reducer based on the initial and handler provided
 * @param {Object} actionMap ActionType to Handler mapping
 * @param {Object} initialState Initial state of the store
 * @returns {function}
 * @param {Object} state current state
 * @param {action} action action to process
 * @returns {Object} next state
 */
export const createBasicReducer = ( actionMap = {}, initialState = {} ) => ( state = initialState, action = {} ) => {

    const handler = actionMap[action.type];
    if ( !handler ) return state;
    const next = handler( state, action );

    return next;

};

export const createPayloadReducer = ( naiveActionMap = {}, initialState = {} ) => {

    const actionMap = {};
    Object.keys( naiveActionMap ).forEach( ( key ) => {

        actionMap[key] = createPayloadHandler( naiveActionMap[key] );

    } );

    return createBasicReducer ( actionMap, initialState );

};

/**
 * Converts a map of actions to state updates to a map of actions to reducers
 * @param {object} updateActionMap a map of actions to handlers that return state updates
 * @param {*} initialState current state
 * @returns {object} next state
 */
export const createUpdateReducer = ( updateActionMap = {}, initialState = {} ) => {

    const actionMap = {};
    Object.keys( updateActionMap ).forEach( ( key ) => {

        actionMap[key] = createUpdateHandler( updateActionMap[key] );

    } );

    return createBasicReducer ( actionMap, initialState );

};

/** Default handler for the creating the reducer
 * @param {Object} state current state passed by the reducer
 * @param {Object} payload new state passed by the reducer
 * @returns {Object}
 */
export const defaultHandler = ( state, payload = {} ) => ( {
    ...state,
    ...payload
} );


export const createReducer = createUpdateReducer;

export default createReducer;
