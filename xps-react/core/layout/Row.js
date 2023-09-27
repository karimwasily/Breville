import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getValidElementProps } from 'xps-utils/html-valid-props';

const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    alignItems: PropTypes.string,
    justify: PropTypes.string,
    noGutters: PropTypes.bool,
};

const defaultProps = {};

const Row = (props) => {
    const { children, className, alignItems, justify, noGutters } = props;

    const rowProps = getValidElementProps('div', props);
    const rowClass = classNames(
        {
            row: true,
            [`justify-content-${justify}`]: justify,
            [`align-items-${alignItems}`]: alignItems,
            'no-gutters': noGutters,
        },
        className,
    );

    return (
        <div className={rowClass} {...rowProps}>
            {children}
        </div>
    );
};

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
