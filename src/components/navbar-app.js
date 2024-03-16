class Navbar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  menus = [
    { label: 'Home', href: '#' },
    { label: 'Favorites', href: '#' },
    { label: 'About', href: 'https://www.linkedin.com/in/roqman-firnando' },
  ];

  render() {
    const menuList = this.menus.map(menu => `
      <li class="nav-item">
        <a 
          class="nav-item__anchor" 
          target="${
            menu.label === 'About' && '_blank'
          }" 
          href="${menu.href}"
          >
            ${menu.label}
          </a>
      </li>`
    ).join('');

    this.shadowDOM.innerHTML = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      header {
        z-index: 20;
        position: fixed;
        top: 1%;
        left: 50%;
        color: rgba(255, 255, 255, 1);
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 80%;
        max-width: 80rem;
        padding: 1rem 2rem;
        border-radius: 1rem;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      }
      
      .nav-wrapper {
        display: none;
        max-width: 50rem;
        margin: 0;
        list-style: none;
        justify-content: end;
        gap: 2rem;
      }
      
      .nav-item, nav-item__anchor{
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
        min-width: 44px;
        min-height: 44px;
      }
      .nav-item__anchor {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #fff;
        min-width: 44px;
        min-height: 44px;
      }
      
      .nav-item:hover, .brand-logo:hover {
        font-weight: bold;
        cursor: pointer;
      }
      
      .mobile-menu {
        display: block;
        cursor: pointer;
        font-size: 1.5rem;
        color: white;
        min-width: 44px;
        min-height: 44px;
        background-color: transparent;
        border: none;
      }
      
      .nav-wrapper__offcanvas {
        list-style: none;
        display: none;
        flex-direction: column;
        gap: 2rem;
        font-weight: 600;
        font-size: 2rem;
      }
      
      .offcanvas-container {
        position: fixed;
        color: #fff;
        z-index: 10;
        transform: translateX(-100%)
      }
      
      .show {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.9);
        transition: transform 0.5s ease-in-out; 
        transform: translateX(100%)
      }
      
      @media (min-width: 768px) {
        .nav-wrapper {
          display:flex;
        }
        
        .mobile-menu {
          displaY: none;
        }
      }
      
      
    </style>
    <header>
      <h1 class="brand-logo" >Zomato</h1>
      <ul class="nav-wrapper">
        ${menuList}
      </ul>
      <button class="mobile-menu">&#9776;</button>
      </header>
      
      <div class="offcanvas-container" >
        <ul class="nav-wrapper__offcanvas">
        ${menuList}
        </ul>
      </div>
    `;
  }
  
  setupEventListeners() {
    const mobileMenu = this.shadowDOM.querySelector('.mobile-menu');
    const navWrapper = this.shadowDOM.querySelector('.nav-wrapper__offcanvas');
    
    mobileMenu.addEventListener('click', () => {
      navWrapper.classList.toggle('show');
    });
  }
}

customElements.define('navbar-app', Navbar);
