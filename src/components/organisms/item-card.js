import { apiEndpoint } from '../../scripts/const';

class ItemCard extends HTMLElement {
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

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        a {
          color: #000;
          text-decoration: none;
        }
        
        .card-item {
          display: flex;
          flex-direction: column;
          border-radius: 1rem;
          position: relative;
          margin: auto;
          background-color: #fff;
          width: 100%;
          height: 100%;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
          transition: box-shadow 0.3s ease;
        }
        
        .card-item:hover {
          box-shadow: rgba(255, 255, 255, 0.8) 0px 0px 10px;
        }

        .card-item__picture {
          width: 100%;
          height: 100%;
          border-radius: 1rem 1rem 0 0;
          border: none;
          object-fit: cover;
        }
        
        .picture-container {
          height: 60%;
        }
        
        .text-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 40%;
          padding: 2rem;
        }
        
        .text-container__wrapper {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 1rem;
        }
        
        .card-item__circle {
          background-color: rgba(255, 170, 0);
          width: 10rem; 
          padding: 0.4rem;
          border-radius: 1rem;
          position: absolute;
          top: 57%;
          left: 30%;
          text-align: center;
        }
        
        .text-semibold {
          font-weight: 600;
        }
        
        .card-item__title, h3 {
          font-size: 1.2rem;
          font-weight: 700;
        }
        
        .text-container__p {
          opacity: 0.7;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
      </style>
      
      <a href="#/detail/${this._datas.id}">
      <div 
        id="card-item__${this._datas.id}" 
        class="card-item">
        <div class="picture-container" >
        <picture>
          <source media="(max-width: 600px)" srcset="${apiEndpoint.imgSm}/${this._datas.pictureId}">
          <source media="(min-width: 600px) and (max-width: 1200px)" srcset="${apiEndpoint.imgMd}/${this._datas.pictureId}">
          <img 
          loading="lazy"
          alt="${this._datas.name}"
          class="lazyload card-item__picture"
          src="${apiEndpoint.imgLg}/${this._datas.pictureId}" 
          />
        </picture>
        </div>
        <div class="text-container">
          <div class="card-item__circle">
            <p class="text-semibold">Rating: ${this._datas.rating}</p>
          </div>
          
          <div class="text-container__wrapper">
            <h3 id="restoName" class="text-semibold">${this._datas.name}</h3>
            <p>${this._datas.city}</p>
          </div>
          
          <p class="text-container__p">${this._datas.description}</p>
        </div>
      </div>
      </a>
    `;
  }
}

customElements.define('item-card', ItemCard);
