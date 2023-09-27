/** STATE FACTORY */

/**
 * Create generic initial state properties used by api actions
 * @param {{time?: number}} defaultState addtional default state to pass
 * @returns {Object} initial state for api actions
 */
export const createInitialState = ( defaultState ) => ( {
    isLoading: false,
    errorFlag: false,
    fetched: false,
    error: null,
    results: null,
    ...defaultState
} );

/** ACTION CREATOR FACTORIES */

/**
 * Generates a fetchRequest actionCreator
 * @param {string} type the type of the action
 * @returns {Function} actionCreator
 * @returns {Object} action that signals the start of a request
 */
export const fetchRequestFactory = ( type ) => ( params ) => ( {
    type,
    payload: {
        params
    }
} );


/**
 * Generates a fetchSuccess actionCreator
 * @param {string} type the type of the action
 * @returns {Function} actionCreator
 * @param {any} results results payload
 * @param {any} [time] optional success timestamp
 * @returns {Object} action that signals the successful completion of a request
 */
export const fetchSuccessFactory = ( type ) => ( results, time = new Date() ) => ( {
    type,
    payload: {
        results,
        time
    }
} );

/**
 * Generates a fetchFail actionCreator
 * @param {string} type the type of the action
 * @returns {Function} actionCreator
 * @param {any} results results payload
 * @param {any} [time] optional success timestamp
 * @returns {Object} action that signals the successful completion of a request
 */
export const fetchFailFactory = ( type ) => ( error ) => ( {
    type,
    payload: {
        error
    },
    error: true
} );

/** REDUCERS */

/**
 * When a fetch is requested, the previous error is cleared and isLoading is set to true
 * @returns {object} state update
 */
export const handleFetchRequest = ( () => ( {
    isLoading: true,
    errorFlag: false,
    error: null
} ) );

/**
 * When a fetch is succeeds, the results are updated, loading ends, the api error is cleared, and an update timestamp is set
 * @param {object} state current state
 * @param {object} responseData the api results and response time
 * @returns {object} state update
 */
export const handleFetchSuccess = ( ( state, { results, time = new Date() } ) => ( {
    results,
    isLoading: false,
    errorFlag: false,
    fetched: true,
    error: null,
    time
} ) );

/**
 * When a fetch fails, the error is set and the loading state is turned off
 * @param {*} state current state
 * @param {*} responseData the api fetch error
 * @returns {object} state update
 */
export const handleFetchFail = ( ( state, { error } ) => ( {
    isLoading: false,
    errorFlag: true,
    fetched: false,
    error

} ) );

/**
 * Default handler does not change the state
 * @param {object} state current state
 * @returns {object} state update (empty)
 */
export const defaultHandler = ( state ) => ( {} );

/** Helpers */

/**
  * Creates the standard api actionCreators
  * @param {string} requestType request action type
  * @param {string} successType success action type
  * @param {string} failType fail action type
  * @returns {Object} maps action types to api reducers
  */
export const createApiActions = ( requestType, successType, failType ) => {

    return {
        fetchRequest: fetchRequestFactory( requestType ),
        fetchSuccess: fetchSuccessFactory( successType ),
        fetchFail: fetchFailFactory( failType )
    };

};

/**
  * Creates an actionMap that maps action types to handlers
  * @param {string} requestType request action type
  * @param {string} successType success action type
  * @param {string} failType fail action type
  * @returns {Object} maps action types to api reducers
  */
export const createApiActionMap = ( requestType, successType, failType ) => ( {
    [requestType]: handleFetchRequest,
    [successType]: handleFetchSuccess,
    [failType]: handleFetchFail
} );
