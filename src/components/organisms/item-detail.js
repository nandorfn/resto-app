/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment';
import 'moment/locale/id';
import Swal from 'sweetalert2';
import fetchData from '../../api/api';
import { apiEndpoint, apiurl } from '../../scripts/const';
import LikeButtonInitiator from '../../scripts/utils/fav-btn-initiator';
import './navbar-app';

class ItemDetail extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initLikeButton();
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
          padding-top: 8rem;
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
        .w-full {
          width: 100%;
        }
        .comment-form {
          margin: 2rem auto 0 auto;
          width: 90%;
          max-width: 30rem;
          text-align: center;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        .comment-form input[type="text"],
        .comment-form textarea{
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .comment-form button[type="submit"] {
          background-color: #D80032;
          border: none;
          border-radius: 8px;
          color: #ffffff;
          padding: 0.5rem 1rem;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .comment-form button[type="submit"]:hover {
          background-color: #b50026;
        }
        .comment-form button[type="submit"]:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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
          <div id="fav-btn__container" class="w-full"></div>
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
        <form id="commentSection" class="comment-form">
          <input  type="text" id="commentName" placeholder="Enter your name...">
          <textarea id="commentReview" placeholder="Enter your comment..."></textarea>
          <button type="submit">Submit</button>
        </form>
        <ul class="section-review__list">${renderReview}</ul>
      </section>
    `;
    const commentSection = this.shadowDOM.getElementById('commentSection');
    const commentName = this.shadowDOM.getElementById('commentName');
    const commentReview = this.shadowDOM.getElementById('commentReview');

    commentSection.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = commentName.value.trim();
      const review = commentReview.value.trim();
      if (name && review) {
        await fetchData({
          url: `${apiurl}${apiEndpoint.review}`,
          method: 'POST',
          data: {
            id: this._datas?.id,
            name,
            review,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response?.message === 'success') {
              const newReview = {
                name,
                date: moment(new Date()).locale('id').format('DD MMMM YYYY'),
                review,
              };
              this._datas.customerReviews.push(newReview);
              commentReview.value = '';
              commentName.value = '';
              this.render();
              Swal.fire({
                text: 'Success post review',
                position: 'top-right',
                showConfirmButton: false,
                toast: true,
                timer: 2000,
              });
            }
          })
          .catch(() => {
            Swal.fire({
              text: 'Failed to post review',
              position: 'top-right',
              showConfirmButton: false,
              toast: true,
              timer: 2000,
            });
          });
      }
    });

    const toggleSubmitButton = () => {
      const name = commentName.value.trim();
      const review = commentReview.value.trim();
      const submitButton = commentSection.querySelector('button[type="submit"]');
      if (!name || !review) {
        submitButton.disabled = true;
      } else {
        submitButton.disabled = false;
      }
    };

    toggleSubmitButton();
    commentName.addEventListener('input', toggleSubmitButton);
    commentReview.addEventListener('input', toggleSubmitButton);
  }

  initLikeButton() {
    const likeButtonContainer = this.shadowDOM.getElementById('fav-btn__container');
    if (likeButtonContainer) {
      LikeButtonInitiator.init({
        likeButtonContainer,
        resto: {
          id: this._datas?.id,
          ...this._datas,
        },
      });
    }
  }
}

customElements.define('item-detail', ItemDetail);
