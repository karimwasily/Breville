/**
 * Storybook stories for the carousel component
 */

import { fetchFromAEM } from 'storybook-aem-wrappers';
import { aemMetadata } from '@storybook/aem';
import { StyleSystem } from 'storybook-aem-style-system';
import { Grid } from 'storybook-aem-grid';

export default {
    title: 'Components/button',
    decorators: [
        aemMetadata({
            decorationTag: {
                cssClasses: ['button', 'component', StyleSystem, Grid],
                tagName: 'div'
            }
        })
    ],
    parameters: {
        aemStyleSystem: {
            policy: '/conf/breville-brands/settings/wcm/policies/breville-brands/components/button.infinity.json'
        }
    }    
};


const emptyContentPath = "/content/breville-brands-style-system/button/jcr:content/root/container/container/button";
export const empty = () => ({
    template: async () => fetchFromAEM(emptyContentPath)
});
empty.story = {
    name: 'Empty Story',
    parameters: {}
};

const heroContentPath = "/content/breville-brands-style-system/button/jcr:content/root/container/container/button";

export const hero = () => ({
    template: async () => fetchFromAEM(heroContentPath)
});
hero.story = {
    name: 'Hero',
	parameters: {
		aemStyleSystem: {
			styleIds: ['1614089153231']
		}
	}
};

const ctaContentPath = "/content/breville-brands-style-system/button/jcr:content/root/container/container/button";

export const cta = () => ({
    template: async () => fetchFromAEM(ctaContentPath)
});
cta.story = {
    name: 'CTA',
	parameters: {
		aemStyleSystem: {
			styleIds: ['1614157987165']
		}
	}
};

