/*
 * OnDemand - Attach javascript events on dynamic content - Inspired by Drupal Behaviours
 * Copyright (C) 2014 James Bodkin
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
(function(window, document) {

    'use strict';

    window.OnDemand = window.OnDemand || {};

    window.OnDemandAttach = function(context, options) {
        context = context || document.body;

        // eslint-disable-next-line
        Object.entries(window.OnDemand).forEach( ([name, obj]) => {
            if (typeof obj.attach === 'function') {
                obj.attach(context, options);
            }
        });
    };

    window.addEventListener('DOMContentLoaded', () => {
        window.OnDemandAttach();
    });

}(window, document));
