const ButtonBasicStyle = `
  :host {
    display: inline-block;
    outline: none;
    appearance: none;
  }
  :host([hidden]) {
    display: none;
    visibility: hidden;
  }
  :host([disabled]) {
    pointer-events: none;
  }
  [part~="button"] {
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
`;

export default class Button extends HTMLElement {
  static get is() {
    return 'mw-button';
  }

  static get observedAttributes() {
    return ['disabled', 'aria-label', 'aria-haspopup', 'label', 'leading-icon', 'trailing-icon'];
  }
  /**
   * @returns {boolean}
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }
  /**
   * @param {boolean} value
   */
  set disabled(value) {
    this.toggleAttribute('disabled', value);
  }

  get label() {
    return this.getAttribute('label') || '';
  }
  set label(value) {
    this.setAttribute('label', value);
  }
  get leadingIcon() {
    return this.getAttribute('leading-icon') || '';
  }
  set leadingIcon(value) {
    this.setAttribute('leading-icon', value);
  }
  get trailingIcon() {
    return this.getAttribute('trailing-icon') || '';
  }
  set trailingIcon(value) {
    this.setAttribute('trailing-icon', value);
  }

  focus() {
    this.buttonElement?.focus();
  }
  blur() {
    this.buttonElement?.blur();
  }

  /**
   * @param {string} value
   * @returns {HTMLElement}
   */
  getEl(value) {
    return this.shadowRoot.querySelector(value);
  }

  /**
   * @returns {HTMLButtonElement}
   */
  get buttonElement() {
    return this.getEl('[part~="button"]');
  }
  /**
   * @returns {HTMLSpanElement}
   */
  get labelElement() {
    return this.getEl('[part~="label"]');
  }
  /**
   * @returns {HTMLSpanElement}
   */
  get leadingIconElement() {
    return this.getEl('[part~="leading-icon"]');
  }
  /**
   * @returns {HTMLSpanElement}
   */
  get leadingIconElement() {
    return this.getEl('[part~="leading-icon"]');
  }

  #attachShadow() {
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }
  #rendered = false;
  #renderTemplate() {
    const shadowRoot = this.shadowRoot;
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${ButtonBasicStyle}</style>
      <button
        rule="button"
        part="inner button"
        ${this.disabled ? 'disabled' : ''}
        ${this.disabled ? 'aria-disabled="true"' : ''}
        aria-label="${this.ariaLabel || this.label || ''}"
        aria-haspopup="${this.ariaHasPopup ? this.ariaHasPopup : ''}"
        aria-controls="${this.ariaControls || ''}"
        aria-expanded="${this.ariaExpanded ? this.ariaExpanded : ''}"
      >
        <span part="leading-icon-root">
          <span part="leading-icon">${this.leadingIcon}</span>
          <slot name="leading-icon"></slot>
        </span>
        <span part="label-root">
          <span part="label">${this.label}</span>
          <slot></slot>
        </span>
        <span part="trailing-icon-root">
          <span part="trailing-icon">${this.trailingIcon}</span>
          <slot name="trailing-icon"></slot>
        </span>
      </button>
    `;
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.#rendered = true;
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.#attachShadow();
    this.#renderTemplate();
  }
  disconnectedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.#rendered) {
      return;
    }

    switch (name) {
      case 'disabled':
        this.buttonElement.disabled = this.disabled;
        this.buttonElement.ariaDisabled = this.disabled ? 'true' : 'false';
        break;

      case 'label':
        this.labelElement.innerText = this.label;
        if (!this.ariaLabel) {
          this.buttonElement.ariaLabel = this.label;
        }

      case 'aria-label':
        this.buttonElement.ariaLabel = this.ariaLabel || this.label;
        break;

      case 'aria-haspopup':
        this.buttonElement.ariaHasPopup = this.ariaHasPopup ? this.ariaHasPopup : '';
        break;

      case 'aria-controls':
        this.buttonElement.ariaControls = this.ariaControls || '';
        break;

      case 'aria-expanded':
        this.buttonElement.ariaExpanded = this.ariaExpanded ? this.ariaExpanded : '';
        break;

      default:
        break;
    }
  }
}

customElements.define(Button.is, Button);
