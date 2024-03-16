class Hero extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open'})
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
      
        .hero-image {
          width: 100%;
          height: 70vh;
          object-fit: cover;
        }
        
        .text-container {
          position: absolute;
          top: 32%;
          left: 50%;
          width: 70%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          
        }
        
        .hero-heading {
          font-size: 2rem;
          margin: 0;
          text-shadow: 1px 1px 19px rgba(0,0,0,0.73);
        }
        
        .hero-p {
          font-size: 1rem;
          text-shadow: 1px 1px 19px rgba(0,0,0,0.73);
        }
        
        @media (min-width: 768px) {
          .hero-heading {
            font-size: 3rem;
          }
          .hero-p {
            font-size: 1.25rem;
          }
        }
        
        @media (min-width: 1200px) {
          .hero-image {
            min-width: 1000px
          }
        }
        
      </style>
      
      <img class="hero-image" src="./images/heros/hero-image_4.jpg" width="100" alt="restaurant thumbnail" />
      <div class="text-container">
        <h1 class="hero-heading">Discover the Best Restaurants in Town</h1>
        <p class="hero-p">Explore a variety of cuisines and dining experiences. Find your new favorite restaurant today.</p>
      </div>
      `
  }
}

customElements.define('hero-app', Hero)