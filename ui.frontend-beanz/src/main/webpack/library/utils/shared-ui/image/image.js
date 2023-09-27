import React from 'react';
import { getValidElementProps } from 'library/utils/html-valid-props';
import classNames from 'classnames';
import PropType from 'prop-types';
import './index.scss';

const Image = ({ isThumbnail, className, ...otherProps }) => {
    const imgProps = getValidElementProps('img', otherProps);
    const classList = classNames(className, {
        'img-thumbnail': isThumbnail
    });

    return (
        <img className={classList} {...imgProps} />
    )
}

Image.propTypes = {
    className: PropType.string,
    isThumbnail: PropType.bool
}

export default Image;