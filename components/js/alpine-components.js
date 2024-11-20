class AlpineComponent extends HTMLElement {
  verifyAttributes(argList, message) {
    if (this.hasAttribute('skip-attribute-verification')) {
      return;
    }
    _verifyAttributes(this, argList, message);
  }

  verifyXData(argList, message) {
    _verifyXData(this, argList, message);
  }

  connectedCallback() {
    const slots = [];
    this.querySelectorAll('[slot]').forEach(slotElement => {
      slots.push({ target: slotElement.getAttribute('slot'), innerHTML: slotElement.innerHTML });
      slotElement.remove();
    });

    slots.forEach(slots => {
      this.querySelector('[slot="' + slots.target + '"]').innerHTML = slots.innerHTML;
    });
  }
}

customElements.define('alpine-component', AlpineComponent);