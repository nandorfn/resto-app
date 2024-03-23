class DetailSkeleton extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
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

        @keyframes skeleton-loading {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
          }
        }

        .skeleton {
          animation: skeleton-loading 1.5s ease-in-out infinite;
          background: linear-gradient(90deg, #f0f0f0 15%, #e0e0e0 60%, #f0f0f0 80%);
          background-size: 200px 100%;
        }

        .section-hero,
        .section-list {
          width: 100%;
          max-width: 80rem;
          margin: 0 auto;
        }

        .section-hero {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 8rem;
        }

        .section-hero__picture {
          display: flex;
          width: 90%;
          max-width: 40rem;
          border-radius: 12px;
          margin: 0 auto;
          height: 26rem; 
          background-color: #ccc; 
        }

        .section-hero__detail {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 90%;
          margin: 0 auto;
        }

        .section-list {
          margin-top: 5rem;
          display: flex;
          width: 90%;
          flex-direction: column;
          gap: 1rem;
        }

        .fav-button {
          background-color: #d80032;
          opacity: 0.75;
          border: none;
          border-radius: 12px;
          color: #ffffff;
          font-weight: 600;
          font-size: 16px;
          padding: 1rem;
        }

        .h-2 {
          height: 2rem;
        }
        .h-4 {
          height: 4rem;
        }
        .h-10 {
          height: 10rem;
        }

        .w-75 {
          width: 75%;
        }
        .w-full {
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .section-hero {
            flex-direction: row;
          }
        }
      </style>

      <section class="section-hero">
        <div class="section-hero__picture skeleton"></div>
        <div class="section-hero__detail">
          <h3 class="skeleton w-full h-4"></h3>
          <div class="skeleton w-75 h-2"></div>
          <div class="skeleton w-full h-10"></div>
          <p class="section-hero__description"></p>
          <button disabled class="fav-button">
            Add to Favorite
          </button>
        </div>
      </section>

      <section class="section-list">
        <h3 class="skeleton w-full h-4"></h3>
        <h3 class="skeleton w-full h-2"></h3>
        <h3 class="skeleton w-75 h-2"></h3>
        <h3 class="skeleton w-full h-2"></h3>
      </section>
    `;
  }
}

customElements.define('detail-skeleton', DetailSkeleton);
