import './style.css';
import App from './components/app.js';
import { flappy } from './components/flappy.js';

window.onload = () => {
  new App().run();
  flappy();
};
