import { LitElement, PropertyDeclarations, unsafeCSS, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import style from './assets/sellItem.css?inline';


@customElement('sell-item')
export class SellItem extends LitElement {
  title: string;
  imgSrc: string;
  price: number;
  discount: number;
  rating: number;
  stars: string;
  types: string;

  constructor() {
    super();
    this.title = '';
    this.imgSrc = '';
    this.price = 0;
    this.discount = 0;
    this.rating = 4;
    this.stars = '⭐';
    this.types = '';
  }

  static get properties(): PropertyDeclarations {
    return {
      title: { type: String },
      imgSrc: { type: String },
      price: { type: Number },
      discount: { type: Number },
      rating: { type: Number },
      stars: { type: String },
      types: { type: String },
    };
  }

  private setDiscount(price: number, discount: number) {
    return price * (1 - discount / 100);
  }

  private toChileanCurrency(price: number) {
    return price.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
  }


  render() {
    return html`
      <div class="container">
      
        <div class="img-container">
          <img id="product-image" class="rounded" src=${this.imgSrc} alt="" />
        </div>
      
        <h4 class="title">
          ${this.title}
        </h4>
      
        <div class="price-box">
          <span>
            <h3 class="sale-price">
              ${this.toChileanCurrency(this.setDiscount(this.price, this.discount))}
            </h3>
            <h4 class="normal-price">
              ${this.toChileanCurrency(this.price)}
            </h4>
          </span>
      
          <span class="discount-tag">
            -${this.discount}%
          </span>
        </div>

        <rating-component rating="${this.rating}"></rating-component>
      </div>
    `;
  }

  static get styles() {
    return unsafeCSS(style);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sell-item': SellItem;
  }
}