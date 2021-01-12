/**
 * @file poster-image.js
 */
import ClickableComponent from './clickable-component.js';
import Component from './component.js';
import * as Fn from './utils/fn.js';
import * as Dom from './utils/dom.js';
import { silencePromise } from './utils/promise';
import * as browser from './utils/browser.js';

/**
 * A `ClickableComponent` that handles showing the poster image for the player.
 *
 * @extends ClickableComponent
 */
class PosterPausedImage extends ClickableComponent {
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

    this.update();
    player.on('posterpausedchange', Fn.bind(this, this.update));
  }

  /**
   * Clean up and dispose of the `PosterPausedImage`.
   */
  dispose() {
    this.player().off('posterpausedchange', this.update);
    super.dispose();
  }

  /**
   * Create the `PosterPausedImage`s DOM element.
   *
   * @return {Element}
   *         The element that gets created.
   */
  createEl() {
    const el = Dom.createEl('div', { className: 'vjs-poster-paused', tabIndex: -1 }, {}, this.getPicture());

    return el;
  }

  getPicture() {
    const poster = this.player().posterPause();
    let picture = null;

    if (typeof poster === 'object') {
      let medias = [];
      const resourceLoop = (kind) => {
        const resources = poster[kind];

        if (!resources) {
          return;
        }

        const keys = Object.getOwnPropertyNames(resources).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
        const maxLen = keys.length - 1;

        const sources = keys.reduce((cur, nxt, idx, arr) => {
          let media;

          if (idx === 0) {
            media = `(min-width: ${arr[idx + 1]}px)`;
          } else if (idx === maxLen) {
            media = `(max-width: ${parseInt(arr[idx] - 1, 10)}px)`;
          } else {
            media = `(min-width: ${arr[idx + 1]}px) and (max-width: ${arr[idx]}px)`;
          }
          cur[nxt] = {
            type: kind,
            srcSet: resources[nxt],
            media
          };

          return cur;
        }, {});

        medias = medias.concat(keys.map((k) => {
          return Dom.createEl('source', { tabIndex: -1 }, sources[k]);
        }));
      };

      resourceLoop('image/webp');

      Object.getOwnPropertyNames(poster).forEach((kind) => {
        if (kind !== 'image/webp') {
          resourceLoop(kind);
        }
      });

      medias.push(Dom.createEl(
        'img',
        { className: 'vjs-poster-img', tabIndex: -1 },
        {
          src:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2O4e/fufwAIyQOXgDhBOwAAAABJRU5ErkJggg=='
        }
      ));

      picture = Dom.createEl('picture', { className: 'vjs-poster-picture', tabIndex: -1 }, {}, medias);
    }

    return picture;
  }

  /**
   * An {@link EventTarget~EventListener} for {@link Player#posterpausedchange} events.
   *
   * @listens Player#posterpausedchange
   *
   * @param {EventTarget~Event} [event]
   *        The `Player#posterpausedchange` event that triggered this function.
   */
  update(event) {
    const url = this.player().posterPause();

    if (typeof url === 'string') {
      this.setSrc(url);
    } else {
      this.setSrcFromObject();
    }

    // If there's no poster source we should display:none on this component
    // so it's not still clickable or right-clickable
    if (url) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Set the source of the `PosterPausedImage` depending on the display method.
   *
   * @param {string} url
   *        The URL to the source for the `PosterPausedImage`.
   */
  setSrc(url) {
    let backgroundImage = '';

    // Any falsy value should stay as an empty string, otherwise
    // this will throw an extra error
    if (url) {
      backgroundImage = `url("${url}")`;
    }

    this.el_.style.backgroundImage = backgroundImage;
  }

  /**
   * Set the source of the `PosterPausedImage` depending on the display method.
   *
   * @param {Object} urls
   *        The URL to the source for the `PosterPausedImage`.
   */
  setSrcFromObject() {
    this.el_.innerHTML = '';
    this.el_.appendChild(this.getPicture());
  }

  /**
   * An {@link EventTarget~EventListener} for clicks on the `PosterPausedImage`. See
   * {@link ClickableComponent#handleClick} for instances where this will be triggered.
   *
   * @listens tap
   * @listens click
   * @listens keydown
   *
   * @param {EventTarget~Event} event
   +        The `click`, `tap` or `keydown` event that caused this function to be called.
   */
  handleClick(event) {
    // We don't want a click to trigger playback when controls are disabled
    if (!this.player_.controls()) {
      return;
    }

    const sourceIsEncrypted =
      this.player_.usingPlugin('eme') && this.player_.eme.sessions && this.player_.eme.sessions.length > 0;

    if (
      this.player_.tech(true) &&
      // We've observed a bug in IE and Edge when playing back DRM content where
      // calling .focus() on the video element causes the video to go black,
      // so we avoid it in that specific case
      !((browser.IE_VERSION || browser.IS_EDGE) && sourceIsEncrypted)
    ) {
      this.player_.tech(true).focus();
    }

    if (this.player_.paused()) {
      silencePromise(this.player_.play());
    } else {
      this.player_.pause();
    }
  }
}

Component.registerComponent('PosterPausedImage', PosterPausedImage);
export default PosterPausedImage;
