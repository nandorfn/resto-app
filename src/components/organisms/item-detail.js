import { apiEndpoint } from '../../scripts/const';

class ItemDetail extends HTMLElement {
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
    const renderItem = (items) => (items ? items.map((item) => `
        <li>${item.name}</li>
      `).join('') : '');

    const categoryList = renderItem(this._datas.categories);
    const foodList = renderItem(this._datas.menus?.foods);
    const drinkList = renderItem(this._datas.menus?.drinks);

    const renderReview = this?._datas.customerReviews?.map((item) => `
      <li class="section-review__card">
        <div>
          <p>${item?.name}</p>
          <span>${item?.date}</span>
        </div>
        <span>${item?.review}</span>
      </li>
    `).join('');
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      
        .section-hero {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 70rem;
          margin: 0 auto;
          margin-top: 8rem;
        }
        
        .section-hero__picture {
          display: flex;
          width: 90%;
          max-width: 40rem;
          border-radius: 12px;
          margin: 0 auto;
        }
        .section-hero__description {
          opacity: 0.7;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 8;
          -webkit-box-orient: vertical;
        }
        .section-hero__detail {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 90%;
          margin: 0 auto;
        }
        
        .section-hero__detail h3 {
          font-size: 2rem;
        }
        
        .section-hero__detail-rating {
          display: flex;
          item-align: center;
        }
        
        .section-hero__detail-rating span {
          color: #5E6469;
          font-weight: 600;
        }
        
        .section-hero__detail-address {
          display: flex;
          gap: 0.5em;
          item-align: center;
          width: 100%;
        }
        
        .section-hero__detail-category ul {
          display: flex;
          flex-wrap: wrap
          flex-direction: row;
          gap: 1rem;
          margin-top: 1rem;
        }
        .section-hero__detail-category li {
          list-style-type: none;
          background-color: #ccc;
          padding: 0.4rem 1.5rem;
          border-radius: 1rem;
        }
        .section-list {
          display: flex;
          flex-direction: column;
          max-width: 40rem;
          margin: 0 auto;
          margin-top: 5rem;
        }
        .section-list h3, 
        .section-review h3 {
          text-align: center;
          font-size: 1.5rem;
        }        
        .section-list__group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 3rem;
          padding: 0;
          justify-content: space-between;
        }
        .section-review {
          display: flex;
          flex-direction: column;
          width: 90%;
          max-width: 80rem;
          margin: 0 auto;
        }
        .section-review__list {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin: 0 auto;
          margin-top: 2.5rem;
        }
        .section-review__card {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background-color: #ccc;
          padding: 0.8rem;
          width: 100%;
          border-radius: 12px;
        }
        .divider {
          margin: 0 8px;
          border-left: 2px solid #5E6469;
        }
        .flex {
          display: flex;
          item-align: center;
        }
        .fav-button {
          background-color: #D80032;
          border: none;
          border-radius: 12px;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 16px;
          padding: 1rem;
          cursor: pointer;
        }
        .fav-button:hover {
          opacity: 0.8;
        }
        @media (min-width: 768px) {
          .section-review__card {
            max-width: 20rem;
          }
        }
        @media (min-width: 992px) {
          .section-hero__picture {
            width: 100%;
          }
          .section-list__group {
            display: flex;
            flex-direction: row;
            gap: 8rem;
            margin: 0 auto;
            justify-content: space-between;
          }
        }
        
        @media (min-width: 1280px) {
          .section-hero {
            flex-direction: row;
          }
          .section-hero__detail {
            width: 100%;
          }
          .section-review {
            margin-top: 4rem;
          }
        }
        
      </style>
      
      <section class="section-hero">
        <img 
          class="section-hero__picture"
          src="${apiEndpoint.imgLg}/${this?._datas?.pictureId}" 
          lazy="loading"
        />
        
        <div class="section-hero__detail">
          <h3>${this?._datas?.name}</h3>
          <div class="flex">
            <div class="section-hero__detail-rating">
              <p>⭐️</p>
              <p>${this?._datas?.rating}</p>
            </div>
            <div class="divider"></div>
            <div class="section-hero__detail-address">
              <p>${this?._datas?.address}</p>
              <p>${this?._datas?.city}</p>
            </div>
          </div>
          <p class="section-hero__description">${this?._datas?.description}</p>
          <div class="section-hero__detail-category">
            <h4>Categories</h4>
            <ul>
              ${categoryList}
            </ul>
          </div>
          
          <button class="fav-button">
            Add to Favorite
          </button>
        </div>
      </section>
      
      <section class="section-list">
        <h3>Menus</h3>
        <div class="section-list__group">
          <div>
            <h4>Food</h4>
            <ul>${foodList}</ul>
          </div>
        
          <div>
            <h4>Drinks</h4>
            <ul>${drinkList}</ul>
          </div>
        </div>
      </section>
      
      <section class="section-review">
        <h3>Customer Reviews</h3>
        <ul class="section-review__list">${renderReview}</ul>
      </section>
    `;
  }
}

customElements.define('item-detail', ItemDetail);
