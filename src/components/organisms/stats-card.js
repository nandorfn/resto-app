import statsMockData from '../../data/statsMockData';

class StatsCard extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  renderedData = statsMockData?.map((item) => `
    <li class="stats-list__item">
      <h2 class="stats-text__header">${item?.head1}</h2>
      <h3 class="stats-text__title">${item?.title}</h3>
      <p class="stats-text__desc">${item?.desc}</p>
    </li>
    `).join('');

  render() {
    this.shadowDOM.innerHTML = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    
      .stats-container {
        display: none;
        z-index: 2;
        transform: translateY(-50%);
      }
    
      .stats-list__wrapper {
        display: grid;
        gap: 4rem;
        grid-template-columns: 1fr 1fr 1fr;
        list-style: none;
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
        text-align: center;
        border-radius: 1rem;
        max-width: 65vw;
        margin: 0 auto;
        background-color: white;
        padding: 2rem 4rem;
      }
      
      .stats-list__item {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
      }
      
      .stats-text__header {
        color: #ff0000;
        font-weight: bold;
        font-size: 2.5rem;
      }
      
      .stats-text__desc {
        color: #7a7576;
      }
      
      @media (min-width: 992px) {
        .stats-container {
          display: flex;
        }
      }
    </style>
      
      <div class="stats-container">
        <ul class="stats-list__wrapper">
          ${this.renderedData}
        </ul>
      </div>
    `;
  }
}

customElements.define('stats-card', StatsCard);
