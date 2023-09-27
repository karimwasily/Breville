/**
 * Storybook stories for the carousel component
 */

import { fetchFromAEM } from 'storybook-aem-wrappers';
import { aemMetadata } from '@storybook/aem';
import { StyleSystem } from 'storybook-aem-style-system';
import { Grid } from 'storybook-aem-grid';

export default {
    title: 'Components/Header with CTA Blocks',
    decorators: [
        aemMetadata({
            decorationTag: {
                cssClasses: ['container', 'component', StyleSystem],
                tagName: 'div'
            }
        })
    ],
    parameters: {
        aemStyleSystem: {
            policy: '/conf/breville-brands/settings/wcm/policies/breville-brands/components/container.infinity.json'
        }
    }     
};

const coffeeLowdownPath = "/content/breville-brands/language-masters/en/jcr:content/root/container/container/container_2078176575";
export const coffeeLowdown = () => ({
    template: async () => fetchFromAEM(coffeeLowdownPath)
});
coffeeLowdown.story = {
    name: 'Coffee Lowdown Story',
    parameters: {
		aemStyleSystem: {
			styleIds: ['1614244189516']
		}
	}
};
