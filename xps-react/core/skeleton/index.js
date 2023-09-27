import React from 'react';
import './index.scss';

export default function Skeleton( {
    count,
    width,
    height,
    className: customClassName
} ) {

    const elements = [];

    for ( let i = 0; i < count; i++ ) {

        const className = `loading-skeleton ${ customClassName }`;

        elements.push(
            <span key={ i } className={ className } style={{ width: `${ width }px`, height: `${ height }px` }}>
                &zwnj;
            </span>
        );

    }

    return (
        <div className='skeleton-loader-wrapper'>
            { elements }
        </div>
    );

}

Skeleton.defaultProps = {
    count: 1,
    duration: 1.2,
    width: null,
    wrapper: null,
    height: null,
    circle: false
};