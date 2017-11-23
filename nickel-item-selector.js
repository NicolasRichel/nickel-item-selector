// Import PolymerElement
import {Element as PolymerElement} from '../@polymer/polymer/polymer-element.js';
// Import other elements
import '../@polymer/polymer/lib/elements/array-selector.js';
import '../@polymer/polymer/lib/elements/dom-repeat.js';

/**
 * # Nickel Item Selector
 */
class NickelItemSelector extends PolymerElement {

  static get template() {
    return `
        <div id="container">
          <template is="dom-repeat" items="[[items]]">
            <div id="box[[index]]" class="item-container">
              <span>Otpion [[index]]</span> : 
            </div>
          </template>
          <array-selector
            items="[[items]]"
            selected={{selected}}
            multi="[[multi]]"
            toggle>
          </array-selector>
          <div hidden><slot name="item-elem"></slot></div>
        </div>`;
  }

  static get properties() {
    return {
      /** An array of items (items can be any type of Object) */
      items: Array,

      /**
       * Indicates whether it is possible to select multiple item of not.
       * If `false` only one item can be selected at a time.
       */
      multi: {
        type: Boolean,
        value: false
      },

      /**
       * An array containing the selected items.
       * If `multi` is `false` then it is jsut the selected item (Object).
       */
      selected: {
        type: Object,
        notify: true
      }
    };
  }

  constructor() {
    super();
    this.addEventListener('dom-change', () => {
      const itemElem = this.shadowRoot.querySelector('slot[name=item-elem]').assignedNodes()[0];
      this.shadowRoot.querySelectorAll('.item-container').forEach((node) => {
        node.appendChild(itemElem.cloneNode());
      });
    });
  }

};
customElements.define('nickel-item-selector', NickelItemSelector);
