import 'regenerator-runtime';
import '../styles/main.css';
import '../components/organisms/navbar-app';
import '../components/organisms/footer-app';
import App from './app';
import swRegister from './utils/sw-register';

const app = new App({
  content: document.querySelector('#mainContent'),
  drawer: document.querySelector('#drawer'),
  button: document.querySelector('#drawer-toggle'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
