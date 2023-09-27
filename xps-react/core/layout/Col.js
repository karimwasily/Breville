import React from 'react';
import classNames from 'classnames';

import { getValidElementProps } from 'xps-utils/html-valid-props';
import { DEVICE_SIZES } from 'xps-utils/constants';

import { propTypes, defaultProps } from './constants';

const Col = (props) => {
    const { alignSelf, breakline, children, className } = props;
    const classes = [];
    const colProps = getValidElementProps('div', props);

    DEVICE_SIZES.forEach((size) => {
        function pushProp(propSuffix, modifier) {
            const base = 'col-';
            // let base = propSuffix.length < 1 ? 'col-' : '';
            const propName = `${size}${propSuffix}`;

            const propValue = props[propName];

            let gridClass = modifier.startsWith('-') ? `${base}${size}${modifier}` : `${modifier}${base}${size}`;

            if (!propValue) return;
            if (typeof propValue === 'number' || typeof propValue === 'string') {
                gridClass = modifier.startsWith('-')
                    ? `${base}${size}-${propValue}${modifier}`
                    : `${base}${size}-${modifier}${propValue}`;

                return classes.push(gridClass);
            }

            classes.push(gridClass);
        }

        pushProp('', '');
        pushProp('Offset', 'offset-');
        pushProp('Push', 'push-');
        pushProp('Pull', 'pull-');
        pushProp('Hide', '-hide');
        pushProp('Only', '-only');
        pushProp('Up', '-up');
        pushProp('Down', '-down');
    });

    classes.forEach((item) => {
        item.toString();
        if (item.substring(0, 4) !== 'col-') classes.unshift('col');
    });

    if (classes.length === 0) classes.push('col');

    const colClass = classNames(
        {
            'w-100': breakline,
            [`align-self-${alignSelf}`]: alignSelf,
        },
        classes,
        className,
    );

    return (
        <div className={colClass} {...colProps}>
            {children}
        </div>
    );
};

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default Col;
