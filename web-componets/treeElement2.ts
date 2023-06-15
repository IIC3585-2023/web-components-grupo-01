import { appendNode } from "../lib/utils";


export default class TreeItem extends HTMLElement {
  _shadowRoot: ShadowRoot | null;
  $children: HTMLSlotElement | null;
  $button: HTMLButtonElement | null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this.setCSS();
    appendNode(this, "div", (container: HTMLDivElement) => {
      appendNode(this._shadowRoot, "slot", (children: HTMLSlotElement) => {
        appendNode(this._shadowRoot, "button", (button: HTMLButtonElement) => {
          container.classList.add("container");
          this.$children = children;
          this.$button = button;
          const firstChild = children?.assignedNodes()[0] as Text;
          button!.innerText = firstChild?.textContent?.trim() || "";
    
          firstChild.textContent = "";
          button!.addEventListener("click", this.showChildren.bind(this));
        })
      })
    })

  }

  showChildren() {
    this.$children!.style.display = this.$children!.style.display === "none" ? "block" : "none";
  }

  setCSS() {
    this._shadowRoot!.innerHTML = `
      <style>
        .container {
          margin-left: 20px;
          flex-direction: column;
        }

        button {
          display: flex;
          align-items: center;
          margin: 8px 16px;
          padding: 8px 16px;
          background-color: white;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.8;
        }

        slot {
          display: none;
        }
      </style>
    `;
  }
}

customElements.define('tree-item', TreeItem);
