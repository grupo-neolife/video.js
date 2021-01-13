/**
 * @file fullscreen-toggle.js
 */
// import Button from '../button.js';
import ClickableComponent from '../clickable-component.js';
import Component from '../component.js';

/**
 * Toggle fullscreen video
 *
 * @extends ClickableComponent
 */
class Forward extends ClickableComponent {
  /**
   * Creates an instance of this class.
   *
   * @param {Player} player
   *        The `Player` that this class should be attached to.
   *
   * @param {Object} [options]
   *        The key/value store of player options.
   */
  constructor(player, options) {
    super(player, options);
  }

  /**
   * Create the `Component`'s DOM element
   *
   * @return {Element}
   *         The element that was created.
   */
  createEl() {
    const el = super.createEl(
      'button',
      {
        className: 'vjs-control vjs-button ' + this.buildCSSClass(),
        title: this.localize('forwardText'),
        innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24"><title>controls-forward</title><path d="M23.5,10.865,13,1.384a1.5,1.5,0,0,0-2.5,1.138V8.047a.25.25,0,0,1-.418.186L2.5,1.384A1.5,1.5,0,0,0,0,2.522V21.479a1.5,1.5,0,0,0,2.5,1.136l7.583-6.847a.25.25,0,0,1,.418.186v5.525A1.5,1.5,0,0,0,13,22.615l10.5-9.479A1.539,1.539,0,0,0,23.5,10.865Z"/></svg>'
      },
      {
        'aria-hidden': 'true'
      }
    );

    return el;
  }

  /**
   * Builds the default DOM `className`.
   *
   * @return {string}
   *         The DOM `className` for this object.
   */
  buildCSSClass() {
    return `vjs-time-control ${super.buildCSSClass()}`;
  }

  /**
   * This gets called when an `Forward` is "clicked". See
   * {@link ClickableComponent} for more detailed information on what a click can be.
   *
   * @param {EventTarget~Event} [event]
   *        The `keydown`, `tap`, or `click` event that caused this function to be
   *        called.
   *
   * @listens tap
   * @listens click
   */
  handleClick(event) {
    // console.log("event forward click/tap", event);
    const player = this.player();

    player.currentTime(player.currentTime() + 5);
    player.tech().trigger('forward');
  }
}

/**
 * The text that should display over the `Forward`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */
Forward.prototype.controlText_ = 'forward';

Component.registerComponent('Forward', Forward);
export default Forward;
