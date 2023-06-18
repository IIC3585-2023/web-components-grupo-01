import { LitElement, PropertyDeclarations, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('rating-component')
export default class Rating extends LitElement {
  rating: number;
  $colorActive: string;
  $colorInactive: string;

  constructor() {
    super();
    this.rating = 1;
    this.$colorActive = "#F6BE00";
    this.$colorInactive = "#ffd27d";
  }

  static get properties(): PropertyDeclarations {
    return {
      rating: { type: Number },
    };
  }

  // connectedCallback() {
  //   super.connectedCallback();
  //   this.rating = parseInt(this.getAttribute("rating") || 0);
  // }

  renderStarIcons() {
    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
      starIcons.push(html`
      <star-icon
      color="${this.rating >= i ? this.$colorActive : this.$colorInactive}"
      size="20px"
      @click="${() => this.updateRating(i)}"
      ></star-icon>
      `);
    }
    return starIcons;
  }

  updateRating(value: number) {
    this.rating = value;
  }

  static get styles() {
    return css`
      .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

        star-icon {
          margin: 0 3px;
          cursor: pointer;
        }
        `;
  }

  render() {
    return html`
      <div class="container">
        ${this.renderStarIcons()}
      </div>
  `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rating-component': Rating;
  }
}
