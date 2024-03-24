class ItemFavorite extends HTMLElement {
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

  renderEmpty(message) {
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
    if (this?._datas.length === 0) {
      this.renderEmpty('Your favorite restaurant is empty');
    } else {
      const restaurantListElement = document.createElement('item-list');
      this.shadowDOM.innerHTML = `
        
      `;
    }
  }
}

customElements.define('item-favorite', ItemFavorite);
