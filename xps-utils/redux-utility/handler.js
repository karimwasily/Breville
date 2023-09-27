// process the action, replacing the state
export const createPayloadHandler = ( handler ) => ( state, { payload } ) => {

    const next = handler( state, payload );

    return next;

};

// process the action, updating the state
export const createUpdateHandler = ( handler ) => ( state, { payload = {} } = {} ) => {

    if ( Array.isArray( handler ) ) {

        const next = {};
        handler.forEach( ( each ) => {

            next[each] = payload[each];

        } );

        return { ...state, ...next };

    }

    const next = handler( state, payload );

    return {
        ...state,
        ...next
    };

};
