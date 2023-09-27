/**
 * Storybook stories for the carousel component
 */

import { fetchFromAEM } from 'storybook-aem-wrappers';
import { aemMetadata } from '@storybook/aem';
import { StyleSystem } from 'storybook-aem-style-system';
import { Grid } from 'storybook-aem-grid';

export default {
    title: 'Components/title',
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
            policy: '/conf/breville-brands/settings/wcm/policies/breville-brands/components/title.infinity.json'
        }
    }
};

const titleContentPath = "/content/breville-brands-style-system/title/jcr:content/root/container/container/empty";
export const empty = () => ({
    template: async () => fetchFromAEM(titleContentPath)
});
empty.story = {
    name: 'Empty',
	parameters: {}
};
