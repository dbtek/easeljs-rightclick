/**!
 * Additional events for EaselJS DisplayObject classs.
 * v0.1.0
 * @author İsmail Demirbilek
 * @license MIT
 */
(function() {
  var _addEventListener = createjs.DisplayObject.prototype.addEventListener;
  /**
   * Called when click event with right mouse button happens.
   * @param  {Function} callback Actual right click event handler function.
   * @return {Function}          Mouse down handler function, evaluates event and decides whether it's a right click or not. If it's right one, calls callback function.
   */
  var _rightClickListener = function(callback) {
    /**
     * Wrapper listener on click event to check whether if it's a right click or not. If it's right click then calls back the actual right click listener.
     * @param  {Event} event Mouse down event.
     */
    return (function(event) {
      /** snippet taken from http://stackoverflow.com/a/2405835/293569 */
      var isRightMB;
      e = event.nativeEvent;

      if("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = e.which == 3;
      else if("button" in e)  // IE, Opera
        isRightMB = e.button == 2;

      isRightMB && callback(event);
    });
  };

  /**
   * Overrides addEventListener to support right click on display object instances.
   * @override
   * @param {String} type         Event type
   * @param {Function} listener   Callback
   * @param {Boolean} useCapture  ?
   */
  createjs.DisplayObject.prototype.addEventListener = function(type, listener, useCapture) {
    if(type === 'rightclick') {
      _addEventListener.apply(this, ['mousedown', _rightClickListener(listener), useCapture]);
    }
    else {
      _addEventListener.apply(this, arguments);
    }
  }
})();
