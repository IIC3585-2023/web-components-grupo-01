import { appendNode } from "../lib/utils";


export default class TreeItem extends HTMLElement {
  _shadowRoot: ShadowRoot | null;
  $children: HTMLSlotElement | null;
  $button: HTMLButtonElement | null;

  constructor() {
    super();
    appendNode(this, "div", (container: HTMLDivElement) => {
      appendNode(container, "button", (button: HTMLButtonElement) => {
        appendNode(button, "slot", (children: HTMLSlotElement) => {
          container.classList.add("container");
          this._shadowRoot = this.attachShadow({ mode: "open" });
          console.log(this._shadowRoot);
          this.$children = this._shadowRoot.querySelector("slot");
          this.$button = this._shadowRoot.querySelector("button");

          const firstChild = this.$children?.assignedNodes()[0] as Text;
          button!.innerText = firstChild?.textContent?.trim() || "";

          firstChild.textContent = "";
          this.$button!.addEventListener("click", this.showChildren.bind(this));
        })
      })
    })
    this.setCSS();

  }

  showChildren() {
    this.$children!.style.display = this.$children!.style.display === "none" ? "block" : "none";
  }

  setCSS() {
    this._shadowRoot!.innerHTML = `
      <style>
.container {
  margin-left: 20px;
  opacity: 0.9;
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
  background-color: gray;
}

slot {
  display: none;
}
</style>
    `;
  }
}

customElements.define('tree-item', TreeItem);
