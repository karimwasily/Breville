import {
    htmlGlobalAttrs,
    htmlGlobalEvents,
    htmlInputAttrs,
    htmlButtonAttrs,
    htmlLinkAttrs,
    htmlImgAttrs,
    htmlListAttrs,
    htmlSvgAttrs,
    htmlSelectAttrs,
    htmlOptionAttrs,
    htmlOptGroupAttrs,
} from './constant';

export const htmlGlobalProps = [...htmlGlobalAttrs, ...htmlGlobalEvents];
export const htmlInputProps = [...htmlGlobalProps, ...htmlInputAttrs];
export const htmlButtonProps = [...htmlGlobalProps, ...htmlButtonAttrs];
export const htmlLinkProps = [...htmlGlobalProps, ...htmlLinkAttrs];
export const htmlImgProps = [...htmlGlobalProps, ...htmlImgAttrs];
export const htmlListProps = [...htmlGlobalProps, ...htmlListAttrs];
export const htmlSvgProps = [...htmlGlobalProps, ...htmlSvgAttrs];

export const hasValidPrefix = (prop) => /^data-.*$/.test(prop) || /^aria-.*$/.test(prop);

export const getValidElementProps = (el, props) => {
    const elements = {
        global: htmlGlobalProps,
        a: htmlLinkProps,
        div: htmlGlobalProps,
        input: htmlInputProps,
        img: htmlImgProps,
        button: htmlButtonProps,
        li: htmlListProps,
        svg: htmlSvgProps,
        select: htmlSelectAttrs,
        option: htmlOptionAttrs,
        optgroup: htmlOptGroupAttrs,
    };

    const validProps = elements[el];
    const elProps = {};

    Object.keys(props).forEach((prop) => {
        const val = props[prop];

        let target;
        const possiblePrefix = hasValidPrefix(prop) || prop === 'role';

        if (validProps.includes(prop) || possiblePrefix) {
            target = elProps;
            target[prop] = val;
        }
    });

    return elProps;
};
