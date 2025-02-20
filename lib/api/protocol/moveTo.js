const {Origin} = require('selenium-webdriver');
const ProtocolAction = require('./_base-action.js');

/**
 * Move the mouse by an offset of the specified [Web Element ID](https://www.w3.org/TR/webdriver1/#dfn-web-elements) or relative to the current mouse cursor, if no element is specified. If an element is provided but no offset, the mouse will be moved to the center of the element.
 *
 * If an element is provided but no offset, the mouse will be moved to the center of the element. If the element is not visible, it will be scrolled into view.
 *
 * @example
 * this.demoTest = function (browser) {
 *   browser.moveTo(null, 110, 100);
 * };
 *
 * @syntax .moveTo([webElementId], xoffset, yoffset, [callback])
 * @syntax .moveTo(null, xoffset, yoffset, [callback])
 * @editline L1335
 * @param {string} [webElementId] The [Web Element ID](https://www.w3.org/TR/webdriver1/#dfn-web-elements) assigned to the element to move to. If not specified or is null, the offset is relative to current position of the mouse.
 * @param {number} xoffset X offset to move to, relative to the center of the element. If not specified, the mouse will move to the middle of the element.
 * @param {number} yoffset Y offset to move to, relative to the center of the element. If not specified, the mouse will move to the middle of the element.
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api protocol.useractions
 */
module.exports = class Command extends ProtocolAction {

  command(webElementId, xoffset, yoffset, callback = function() {}) {
   
    if (arguments.length >= 3 && typeof arguments[0] === 'string' || arguments[0] === null) {
      if (webElementId === null) {
        webElementId = Origin.POINTER;
      } else {
        ProtocolAction.validateElementId(webElementId);
      }
     
    } else if (arguments.length >= 2 && typeof arguments[0] === 'number') {
      webElementId = Origin.POINTER;
      xoffset = arguments[0];
      yoffset = arguments[1];
      callback = arguments.length === 3 ? arguments[2] : callback;
      
    } else {
      throw new Error('Invalid Parameters for moveTo Command');
    }

    return this.transportActions.moveTo(webElementId, xoffset, yoffset, callback);
    
  }
};
