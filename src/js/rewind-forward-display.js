/**
 * @file poster-image.js
 */
import Component from './component.js';
import * as Fn from './utils/fn.js';

/**
 * A `Component` that handles showing the rewind/forward time changes in the player.
 *
 * @extends Component
 */
class RewindForward extends Component {
  /**
   * Create an instance of this class.
   *
   * @param {Player} player
   *        The `Player` that this class should attach to.
   *
   * @param {Object} [options]
   *        The key/value store of player options.
   */
  constructor(player, options) {
    super(player, options);

    // this.update();
    player.on('rewind', Fn.bind(this, this.rewind));
    player.on('forward', Fn.bind(this, this.forward));
  }

  /**
   * An {@link EventTarget~EventListener} for {@link Player#rewind} events.
   *
   * @listens Player#rewind
   *
   * @param {EventTarget~Event} [event]
   *        The `Player#rewind` event that triggered this function.
   */
  rewind(event) {
    // console.log('event rewind', event);
    this.clean();
    this.addClass('action-rewind');
    this.addClass('show');
    this.createTimeout();
  }

  /**
   * An {@link EventTarget~EventListener} for {@link Player#forward} events.
   *
   * @listens Player#forward
   *
   * @param {EventTarget~Event} [event]
   *        The `Player#forward` event that triggered this function.
   */
  forward(event) {
    // console.log('event forward', event);
    this.clean();
    this.addClass('action-forward');
    this.addClass('show');
    this.createTimeout();
  }

  createTimeout() {
    const $this = this;

    this.timeout = this.setTimeout(function() {
      $this.removeClass('show');
      $this.addClass('vjs-hide');
    }, 250);
  }

  clean() {
    if (this.timeout) {
      this.clearTimeout(this.timeout);
    }
    this.removeClass('action-forward');
    this.removeClass('action-rewind');
    this.removeClass('vjs-hide');
    this.removeClass('show');
  }

  /**
   * Clean up and dispose of the `RewindForward`.
   */
  dispose() {
    this.player().off('rewind', this.rewind);
    this.player().off('forward', this.forward);
    super.dispose();
  }

  /**
   * Create the `RewindForward`s DOM element.
   *
   * @return {Element}
   *         The element that gets created.
   */
  createEl() {
    const el = super.createEl('div', {
      className: 'vjs-rewind-forward-display vjs-hide',
      tabIndex: -1,
      innerHTML: `
      <svg version="1.1" fill="#ffffff" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 36 36" style="enable-background:new 0 0 36 36;" xml:space="preserve">
      <title>button-refresh-arrows</title>
      <g>
      <path d="M 18,11 V 7 l -5,5 5,5 v -4 c 3.3,0 6,2.7 6,6 0,3.3 -2.7,6 -6,6 -3.3,0 -6,-2.7 -6,-6 h -2 c 0,4.4 3.6,8 8,8 4.4,0 8,-3.6 8,-8 0,-4.4 -3.6,-8 -8,-8 z m -1.3,8.9 .2,-2.2 h 2.4 v .7 h -1.7 l -0.1,.9 c 0,0 .1,0 .1,-0.1 0,-0.1 .1,0 .1,-0.1 0,-0.1 .1,0 .2,0 h .2 c .2,0 .4,0 .5,.1 .1,.1 .3,.2 .4,.3 .1,.1 .2,.3 .3,.5 .1,.2 .1,.4 .1,.6 0,.2 0,.4 -0.1,.5 -0.1,.1 -0.1,.3 -0.3,.5 -0.2,.2 -0.3,.2 -0.4,.3 C 18.5,22 18.2,22 18,22 17.8,22 17.6,22 17.5,21.9 17.4,21.8 17.2,21.8 17,21.7 16.8,21.6 16.8,21.5 16.7,21.3 16.6,21.1 16.6,21 16.6,20.8 h .8 c 0,.2 .1,.3 .2,.4 .1,.1 .2,.1 .4,.1 .1,0 .2,0 .3,-0.1 L 18.5,21 c 0,0 .1,-0.2 .1,-0.3 v -0.6 l -0.1,-0.2 -0.2,-0.2 c 0,0 -0.2,-0.1 -0.3,-0.1 h -0.2 c 0,0 -0.1,0 -0.2,.1 -0.1,.1 -0.1,0 -0.1,.1 0,.1 -0.1,.1 -0.1,.1 h -0.7 z"class="path-rewind"></path>
      <path d="m 10,19 c 0,4.4 3.6,8 8,8 4.4,0 8,-3.6 8,-8 h -2 c 0,3.3 -2.7,6 -6,6 -3.3,0 -6,-2.7 -6,-6 0,-3.3 2.7,-6 6,-6 v 4 l 5,-5 -5,-5 v 4 c -4.4,0 -8,3.6 -8,8 z m 6.7,.9 .2,-2.2 h 2.4 v .7 h -1.7 l -0.1,.9 c 0,0 .1,0 .1,-0.1 0,-0.1 .1,0 .1,-0.1 0,-0.1 .1,0 .2,0 h .2 c .2,0 .4,0 .5,.1 .1,.1 .3,.2 .4,.3 .1,.1 .2,.3 .3,.5 .1,.2 .1,.4 .1,.6 0,.2 0,.4 -0.1,.5 -0.1,.1 -0.1,.3 -0.3,.5 -0.2,.2 -0.3,.2 -0.5,.3 C 18.3,22 18.1,22 17.9,22 17.7,22 17.5,22 17.4,21.9 17.3,21.8 17.1,21.8 16.9,21.7 16.7,21.6 16.7,21.5 16.6,21.3 16.5,21.1 16.5,21 16.5,20.8 h .8 c 0,.2 .1,.3 .2,.4 .1,.1 .2,.1 .4,.1 .1,0 .2,0 .3,-0.1 L 18.4,21 c 0,0 .1,-0.2 .1,-0.3 v -0.6 l -0.1,-0.2 -0.2,-0.2 c 0,0 -0.2,-0.1 -0.3,-0.1 h -0.2 c 0,0 -0.1,0 -0.2,.1 -0.1,.1 -0.1,0 -0.1,.1 0,.1 -0.1,.1 -0.1,.1 h -0.6 z" class="path-forward"></path>
      </g>
      </svg>
      `
    });

    el.appendChild(this.createLabel());

    return el;
  }

  createLabel() {
    this.label = super.createEl('span');

    return this.label;
  }

  // createSVG() {
  //   let svg = super.createEl(
  //     "svg",
  //     {
  //     },
  //     {
  //       xmlns: "http://www.w3.org/2000/svg",
  //       viewBox: "0 0 36 36",
  //       fill: "#ffffff",
  //     }
  //   );

  //   svg.viewBox = "0 0 36 36";
  //   svg.innerHTML =
  //     '<title>button-refresh-arrows</title><path d="M6.177,6.167A8.233,8.233,0,0,1,14.528,4.14a1.249,1.249,0,1,0,.76-2.38A10.751,10.751,0,0,0,2.046,16.033a.248.248,0,0,1-.094.3l-1.4.922A1,1,0,0,0,.9,19.071l4.407.908a.99.99,0,0,0,.2.021,1,1,0,0,0,.979-.8L7.4,14.794a1,1,0,0,0-1.529-1.037l-1.339.881a.25.25,0,0,1-.376-.133A8.269,8.269,0,0,1,6.177,6.167Z"/><path d="M23.883,5.832a1,1,0,0,0-.763-.807l-4.388-1a1,1,0,0,0-1.2.752l-1,4.387a1,1,0,0,0,1.507,1.069l1.443-.906A.247.247,0,0,1,19.7,9.3a.252.252,0,0,1,.153.159A8.249,8.249,0,0,1,9.568,19.883a1.25,1.25,0,1,0-.737,2.388A10.75,10.75,0,0,0,21.985,8a.248.248,0,0,1,.1-.3l1.346-.846A1,1,0,0,0,23.883,5.832Z"/>';

  //   return svg;
  // }

  /**
   * An {@link EventTarget~EventListener} for {@link Player#posterpausedchange} events.
   *
   * @listens Player#posterpausedchange
   *
   * @param {EventTarget~Event} [event]
   *        The `Player#posterpausedchange` event that triggered this function.
   */
  update(time) {}
}

Component.registerComponent('RewindForward', RewindForward);
export default RewindForward;
