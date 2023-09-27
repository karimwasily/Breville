import React from 'react';
import { node, object } from 'prop-types';

const CmpContainer = ( { children, ...props } ) => {

    return (
        <div className='container' { ...props }>
            <div className='cmp-container'>
                { children }
            </div>
        </div>
    );

};

CmpContainer.propTypes = {
    children: node.isRequired,
    props: object
};

export default CmpContainer;
