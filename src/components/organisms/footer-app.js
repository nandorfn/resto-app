class Footer extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  date = new Date();

  thisYear = this.date.getFullYear();

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      
        footer {
          background-color: #231A1B;
          display: flex;
          flex-direction: column;
          margin: 4rem auto 0 auto;
          text-align: center;
          color: #fff;
          padding: 2rem;
        }
        
        .footer-title {
          display: flex;
          flex-direction: column;
          max-width: 30rem;
          gap: 1rem;
          padding: 2rem;
          margin: 0 auto;
        }
        
        .footer-detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .inline {
          display: inline-flex;
          gap: 1rem;
          justify-content: center;
        }
        
        @media (min-width: 768px) {
          .footer-detail {
            flex-direction: row;
            justify-content: space-around;
          }
        }
      </style>
    
      <footer>
        <div class="footer-title">
          <h1>Zomato</h1>
          <p class="hero-p">Explore a variety of cuisines and dining experiences. Find your new favorite restaurant today.</p>
        </div>
        
        <div class="footer-detail" >
          <p>&copy; Copyright ${this.thisYear}</p>
          
          <div class="inline">
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-app', Footer);
