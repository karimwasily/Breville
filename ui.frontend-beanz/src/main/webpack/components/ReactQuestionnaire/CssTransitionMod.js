import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { node, string, any } from 'prop-types';

// * helper to automatically apply event listener to avoid timeout declaration
// * and presumption we will use BEM namespacing with 'transition-' prefix

const CSSTransitionMod = ( { children, classNames = null, ...props } ) => {

    function listener( node, done ) {

        node.addEventListener( 'transitionend', done, false );

    }

    return (
        <CSSTransition
            mountOnEnter={ true }
            addEndListener={ listener }
            classNames= { classNames || 'transition-' }
            unmountOnExit={ true }
            { ...props }
        >
            { children }
        </CSSTransition>
    );

};

CSSTransitionMod.propTypes = {
    children: node,
    classNames: string,
    props: any
};

export { CSSTransitionMod };
