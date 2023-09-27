/**
 * Storybook stories for the carousel component
 */

import { fetchFromAEM } from 'storybook-aem-wrappers';
import { aemMetadata } from '@storybook/aem';
import { StyleSystem } from 'storybook-aem-style-system';
import { Grid } from 'storybook-aem-grid';

import '../src/main/webpack/site/main.scss';

export default {
    title: 'Components/teaser',
    decorators: [
        aemMetadata({
            decorationTag: {
                cssClasses: ['title', 'component', StyleSystem, Grid],
                tagName: 'div'
            }
        })
    ],
    parameters: {
        aemStyleSystem: {
            policy: '/conf/breville-brands/settings/wcm/policies/breville-brands/components/teaser.infinity.json'
        }
    }
};

//Empty story (default)
const emptyContentPath = "/content/breville-brands-style-system/teaser/jcr:content/root/container/container/feature";
export const empty = () => ({
    template: async () => fetchFromAEM(emptyContentPath)
});
empty.story = {
    name: 'Empty Story',
    parameters: {}
};

const tileContentPath = "/content/breville-brands-style-system/teaser/jcr:content/root/container/container/feature";
export const tile = () => ({
    template: async () => fetchFromAEM(tileContentPath)
});
tile.story = {
    name: 'Tile Story',
    parameters: {}
};



const heroContentPath = "/content/breville-brands-style-system/teaser/jcr:content/root/container/container/feature";
export const hero = () => ({
    template: async () => fetchFromAEM(heroContentPath)
});
hero.story = {
    name: 'Feature Story',
    decorators: [
        aemMetadata({
            decorationTag: {
                cssClasses: ['teaser', 'section', 'cmp-teaser--hero', StyleSystem, Grid],
                tagName: 'div'
            }
        })
    ],
    parameters: {
        aemStyleSystem: {
            policyXMLFile: '../../ui.content/src/main/content/jcr_root/conf/breville-brands/settings/wcm/policies/.content.xml',
			styleIds: ['1613360791464']
		}
    }
};