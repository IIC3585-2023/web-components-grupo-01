export class TreeItem extends HTMLElement {
  _shadowRoot: ShadowRoot | null;
  $children: HTMLSlotElement | null;
  $button: HTMLButtonElement | null;
  handleClick: Function | null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this.setCSS();
    this.handleClick = null;

    this.$children = this._shadowRoot.querySelector("slot");
    this.$button = this._shadowRoot.querySelector("button");

    const firstChild = this.$children?.assignedNodes()[0] as Text;
    
    this.$button!.innerText = firstChild?.textContent?.trim() || "";

    firstChild.textContent = "";

    this.addEventListener("click", (event) => {
      event.stopPropagation();
      this.showChildren();
    });

    this.addEventListener("click", () => {
      if (this.handleClick)
        this.handleClick(this.$button!.innerText);
    });
  }

  showChildren() {
    this.$children!.style.display = this.$children!.style.display === "none" ? "block" : "none";
  }

  setCSS() {
    this._shadowRoot!.innerHTML = `
      <style>
        .menu-container {
          padding-left: 20px;
          opacity: 0.9;
          flex-direction: column;
          background: #11101d;
          color: white;
          cursor: pointer;
        }

        .button-container {
          display: flex;
          align-items: center;
        }
      
        .button-container:hover {
          background-color: gray;
        }
      
        #menu-button {
          all: unset;
          cursor: pointer;
          padding: 10px;
          display: flex;
          align-items: center;
          flex-direction: row;
        }
      
        slot {
          display: none;
        }
      </style>
      
      <div class="menu-container">
        <div class="button-container">
          <button id="menu-button"></button>
        </div>
        <slot></slot>
      </div>
      `;
  }
}


customElements.define('tree-item', TreeItem);

declare global {
  interface HTMLElementTagNameMap {
    'tree-item': TreeItem
  }
}
