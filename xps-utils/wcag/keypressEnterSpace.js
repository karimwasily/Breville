const KEY_ENTER = 'Enter'
const KEY_SPACE = 'Space'

/**
 * WCAG keypress for Enter & Space
 * 
 * @param {KeyboardEvent} event 
 * @param {function(KeyboardEvent):void} callback 
 * @returns {any}
 * 
 * @see https://www.w3.org/WAI/GL/wiki/Making_actions_keyboard_accessible_by_using_keyboard_event_handlers_with_WAI-ARIA_controls
 */
export const keypressEnterSpace = (event, callback) => {
  switch (event.code) {
    case KEY_ENTER:
    case KEY_SPACE: {
      event.preventDefault();
      event.stopPropagation();
      return callback(event);
    }
  }
}