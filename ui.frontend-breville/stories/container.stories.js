/**
 * Storybook stories for the carousel component
 */

import { fetchFromAEM } from 'storybook-aem-wrappers';
import { aemMetadata } from '@storybook/aem';
import { StyleSystem } from 'storybook-aem-style-system';
import { Grid } from 'storybook-aem-grid';

export default {
    title: 'Components/container',
    decorators: [
        aemMetadata({
            decorationTag: {
                cssClasses: ['container', 'component', StyleSystem, Grid],
                tagName: 'div'
            }
        })
    ],
};


const emptyContentPath = "/content/breville-brands-style-system/container/jcr:content/root/container/container/empty";
export const empty = () => ({
    template: async () => fetchFromAEM(emptyContentPath)
});
empty.story = {
    name: 'Empty Story',
    parameters: {}
};

const roundTileContentPath = "/content/breville-brands/language-masters/en/jcr:content/root/container/container/container_1301153098";
export const roundTile = () => ({
    template: async () => fetchFromAEM(roundTileContentPath)
});
roundTile.story = {
    name: 'Round Tile',
    decorators: [
        aemMetadata({
            decorationTag: {
                cssClasses: ['teaser', 'section', 'cmp-teaser--round-tile', StyleSystem, Grid],
                tagName: 'div'
            }
        })
    ],
    parameters: {
        aemStyleSystem: {
          policy: '/conf/breville-brands/settings/wcm/policies/breville-brands/components/container.infinity.json',
          styleIds: ['1616590523471']
      }
    }
};