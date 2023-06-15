import { LitElement, PropertyDeclarations, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('sell-item')
export class SellItem extends LitElement {
  title: string;
  imgSrc: string;
  price: number;
  discount: number;
  rating: number;
  stars: string;

  constructor() {
    super();
    this.title = 'Submarino BV';
    this.imgSrc = '';
    this.price = 0;
    this.discount = 0;
    this.rating = 4;
    this.stars = '⭐';
  }

  static get properties(): PropertyDeclarations {
    return {
      title: { type: String },
      imgSrc: { type: String },
      price: { type: Number },
      discount: { type: Number },
      rating: { type: Number },
      stars: { type: String },
    };
  }

  renderStars() {
    return this.stars = '⭐'.repeat(this.rating);
  }

  setDiscount(price: number, discount: number) {
    return price * (1 - discount / 100);
  }

  toChileanCurrency(price: number) {
    return price.toLocaleString("es-CL", {style:"currency", currency:"CLP"});
  }


  render() {
    return html`
      <div class="container">
      
        <div class="img-container">
          <img id="product-image" src=${this.imgSrc} alt="No Image" />
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
      
        <span>
          ${this.renderStars()}
          <strong>
          ${this.rating}
          </strong>
        </span>
      
      </div>
    `;
  }

  static get styles() {
    return css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
    .container {
      background-color: white;
      border: 1px solid lightgray;
      border-radius: 8px;
      font-size: 12px;
      font-color: black;
      min-height: 35ch;
      margin: 0rem;
      padding: 1em 1em 0.25em;
      transition: 100ms linear;
      width: 25ch;
    }
    .container:hover {
      scale: 1.05;
    }
  
    img {
      max-width: 100%;
      max-height: 100px;
    }
    
    .img-container {
      align-items: center;
      display: flex;
      padding: 5%
      justify-content: center;
      max-width: 100%;
    }
  
    .price-box {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1em;
    }
  
    .sale-price {
      color: tomato;
      margin: 0;
      width: fit-content;
    }
  
    .normal-price {
      color: gray;
      margin: 0;
      text-decoration: line-through;
      width: fit-content;
    }
  
    .discount-tag {
      align-items: center;
      background-color: tomato;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      height: 50%;
      justify-content: center;
      padding: 4px;
      width: fit-content;
    }`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sell-item': SellItem;
  }
}