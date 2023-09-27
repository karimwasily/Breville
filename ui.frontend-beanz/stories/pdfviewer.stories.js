/**
 * Storybook stories for the carousel component
 */

import { fetchFromAEM } from 'storybook-aem-wrappers';
import { aemMetadata } from '@storybook/aem';
import { StyleSystem } from 'storybook-aem-style-system';
import { Grid } from 'storybook-aem-grid';

export default {
    title: 'Components/pdfviewer',
    decorators: [
        aemMetadata({
            decorationTag: {
                cssClasses: ['pdfviewer', 'component', StyleSystem, Grid],
                tagName: 'div'
            }
        })
    ],
};


const emptyContentPath = "/content/breville-brands-style-system/pdfviewer/jcr:content/root/container/container/empty";
export const empty = () => ({
    template: async () => fetchFromAEM(emptyContentPath)
});
empty.story = {
    name: 'Empty Story',
    parameters: {}
};



const minimalContentPath = "/content/breville-brands-style-system/pdfviewer/jcr:content/root/container/container/minimal";
export const minimal = () => ({
    template: async () => fetchFromAEM(minimalContentPath)
});
minimal.story = {
    name: 'Minimal Story',
    parameters: {}
};



const fullscreenContentPath = "/content/breville-brands-style-system/pdfviewer/jcr:content/root/container/container/fullscreen";
export const fullscreen = () => ({
    template: async () => fetchFromAEM(fullscreenContentPath)
});
fullscreen.story = {
    name: 'Fullscreen Story',
    parameters: {}
};