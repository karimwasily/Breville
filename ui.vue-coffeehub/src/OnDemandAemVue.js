/*
 * OnDemand Vue Integration - Attach javascript events on dynamic content - Inspired
 * by Drupal Behaviours
 * Copyright (C) 2019 Solution Digital Pty Ltd
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Usage: put this in your main.js file to auto maunt AEM / Vue Components
 *
 * import mountAemVue from 'OnDemandAemVue';
 *
 * (function (window) {
 *    mountAemVue(window, App, "UniqueExampleAppName", ".uniqueClassSelector");
 *   // eslint-disable-next-line
 * }(window));
 *
 */
import Vue from "vue";

class OnDemandAemVue {
  parseComponentProperties(component) {
    const rawProperties = component.querySelector(
      'script[type="application/json"]'
    )?.innerHTML;
    const properties = rawProperties ? JSON.parse(rawProperties) : {};
    const allProperties = { ...properties, ...component.dataset };

    return allProperties;
  }

  toKeyValueMap(namedNodeMap) {
    let attrs = {};
    for (let i = 0; i < namedNodeMap.length; i++) {
      const item = namedNodeMap.item(i);
      attrs[item.name] = item.value;
    }
    return attrs;
  }

  parseSlots(h, component) {
    const slots = {};

    component.querySelectorAll("[data-slot-name]").forEach(elem => {
      const elemChild = elem.firstElementChild;
      if (elemChild != null) {
        const attrs = { attrs: this.toKeyValueMap(elemChild.attributes) };
        const tagName = elemChild.tagName;
        const innerHTML = elemChild.innerHTML;
        slots[elem.dataset.slotName] = () => { return h(tagName, attrs, innerHTML); };
      } else {
        const text =  elem.innerText;
        slots[elem.dataset.slotName] = () => { return text; };
      }
    });

    return slots;
  }

  mountVueApp(app, node) {
    new Vue({
      render: h => {
        const context = {
          props: this.parseComponentProperties(node),
          scopedSlots: this.parseSlots(h, node)
        };
        return h(app, context);
      }
    }).$mount(node);
  }

  mountAllComponents(components) {
    document.querySelectorAll("[data-vue-cmp]").forEach(elem => {
      const name = elem.dataset.vueCmp;
      const component = name ? components[name] : null;

      if (component) {
        console.log(`Mounting ${name}`);
        this.mountVueApp(component, elem);
      } else {
        console.warn(
          `Can't locate vue component (${name}). Has it been registered?`
        );
      }
    });
  }
}

export const mountVueComponents = components => {
  document.addEventListener("DOMContentLoaded", () => {
    new OnDemandAemVue().mountAllComponents(components);
  });
};

export default function mountAemVue(window, app, name, klass) {
  window.OnDemand[name] = {
    // eslint-disable-next-line
    attach: function(context, options) {
      if (context.classList.contains(klass)) {
        new OnDemandAemVue().mountVueApp(app, context);
      } else {
        context.querySelectorAll(klass).forEach(component => {
          new OnDemandAemVue().mountVueApp(app, component);
        });
      }
    }
  };
}
