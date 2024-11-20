class HTMXComponent extends HTMLElement {
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
    this.verifyAttributes(['template'], 'HTMXComponent requires attributes: [template]');
    this.setAttribute('hx-get', this.getAttribute('template'));
    this.setAttribute('hx-target', 'this');
    this.setAttribute('hx-trigger', 'load');
    this.setAttribute('hx-swap', 'morph');
    this.setAttribute('hx-ext', 'preload');

    const slots = [];
    this.querySelectorAll('slot').forEach(template => {
      if (template.hasAttribute('name')) {
        slots.push({ target: template.getAttribute('name'), innerHTML: template.innerHTML });
      }
    });

    this.addEventListener('htmx:afterSwap', () => {
      console.debug('htmx:afterSwap', slots);
      slots.forEach(slot => {
        const slotElement = this.querySelector('slot[name="' + slot.target + '"]');
        if (!slotElement.hasAttribute('swapped')) {
          console.debug('swapped', slot.target);
          slotElement.setAttribute('swapped', true);
          htmx.swap(slotElement, slot.innerHTML, { swapStyle: 'innerHTML' });
          htmx.process(slotElement);
        }
      });
    });
  }
}

class NavComponent extends HTMXComponent {
  connectedCallback() {
    this.setAttribute('template', '/components/nav.html');
    this.setAttribute('x-data', `{ page: '${this.getAttribute('page')}' }`);
    super.connectedCallback();
  }
}

customElements.define('htmx-component', HTMXComponent);
customElements.define('custom-nav', NavComponent);