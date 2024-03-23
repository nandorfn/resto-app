class ItemList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set datas(item) {
    this._datas = item;
    this.render();
  }

  renderError(message) {
    this.shadowDOM.innerHTML = `
      <style>
        .placeholder {
          margin: auto;
          font-weight: normal;
          color: #fff;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      </style>
      <h2 class="placeholder">${message}</h2>
    `;
  }

  render() {
    this.shadowDOM.innerHTML = '';
    if (this._datas.length === 0) {
      this.renderError('Restaurant data not found!');
    } else {
      this.shadowDOM.innerHTML += `
        <style>
          * {
            margin: 1rem;
            padding: 0;
            box-sizing: border-box;
          }
        
          :host {
            display: grid;
            max-width: 75vw;
            overflow: hidden;
            place-self: center;
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          @media (min-width: 768px) {
            :host {
              grid-template-columns: 1fr 1fr;
            }
          }
          @media (min-width: 992px) {
            :host {
              grid-template-columns: 1fr 1fr 1fr;
            }
          }

        </style>
      `;

      this._datas.forEach((item) => {
        const restaurantItemElement = document.createElement('item-card');
        restaurantItemElement.datas = item;

        this.shadowDOM.appendChild(restaurantItemElement);
      });
    }
  }
}

customElements.define('item-list', ItemList);
