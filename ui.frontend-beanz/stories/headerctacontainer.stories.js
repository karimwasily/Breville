/**
 * Storybook stories for the carousel component
 */

import { fetchFromAEM } from 'storybook-aem-wrappers';
import { aemMetadata } from '@storybook/aem';
import { StyleSystem } from 'storybook-aem-style-system';
import { Grid } from 'storybook-aem-grid';

export default {
    title: 'Components/Header CTA',
    decorators: [
        aemMetadata({
            decorationTag: {
                cssClasses: ['title', 'button', 'component', StyleSystem, Grid],
                tagName: 'div'
            }
        })
    ]
};

const emptyContentPath = "/content/breville-brands-style-system/headerctacontainer/jcr:content/root/container/container/headerctacontainer";
export const empty = () => ({
    template: async () => fetchFromAEM(emptyContentPath)
});
empty.story = {
    name: 'Empty',
};


const coffeeLowdownPath = "/content/breville-brands-style-system/headerctacontainer/jcr:content/root/container/container/headerctacontainer_c";
export const coffeeLowdown = () => ({
    template: async () => fetchFromAEM(coffeeLowdownPath)
});
coffeeLowdown.story = {
    name: 'Coffee Lowdown',
};


const theBeanEfitsPath = "/content/breville-brands-style-system/headerctacontainer/jcr:content/root/container/container/headerctacontainer";
export const theBeanEfits = () => ({
    template: async () => fetchFromAEM(theBeanEfitsPath)
});
theBeanEfits.story = {
    name: 'The Bean-efits',
};



const heroContentPath = "/content/breville-brands-style-system/headerctacontainer/jcr:content/root/container/container/headerctacontainer";
export const hero = () => ({
    template: async () => fetchFromAEM(heroContentPath)
});
hero.story = {
    name: 'Hero',
};


