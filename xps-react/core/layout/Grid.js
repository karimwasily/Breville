import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getValidElementProps } from 'xps-utils/html-valid-props';

const propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    fluid: PropTypes.bool,
};

const defaultProps = {
    children: null,
    className: '',
    fluid: false,
};

const Grid = React.forwardRef((props, ref) => {
    const { children, className, fluid } = props;

    const gridProps = getValidElementProps('div', props);
    const gridClass = classNames(
        {
            'grid-container': !fluid,
            'grid-container-fluid': fluid,
        },
        className,
    );

    return (
        <div className={gridClass} {...gridProps} ref={ref}>
            {children}
        </div>
    );
});

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
