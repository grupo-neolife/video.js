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
class Rewind extends ClickableComponent {
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
        title: this.localize('rewindText'),
        innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><title>controls-rewind</title><path d="M21.5,1.385,13.918,8.232a.25.25,0,0,1-.418-.185V2.521A1.5,1.5,0,0,0,11,1.385L.505,10.863a1.541,1.541,0,0,0,0,2.273L11,22.614a1.5,1.5,0,0,0,2.5-1.136V15.953a.25.25,0,0,1,.418-.185L21.5,22.614A1.5,1.5,0,0,0,24,21.478V2.521A1.5,1.5,0,0,0,21.5,1.385Z"/></svg>'
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
   * This gets called when an `Rewind` is "clicked". See
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
    // console.log("event rewind click/tap", event);
    const player = this.player();

    player.currentTime(player.currentTime() - 5);
    player.tech().trigger('rewind');
  }
}

/**
 * The text that should display over the `Rewind`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */
Rewind.prototype.controlText_ = 'rewind';

Component.registerComponent('Rewind', Rewind);
export default Rewind;
