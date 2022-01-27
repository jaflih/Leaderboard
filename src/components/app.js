import Game from './game.js';
import { selector } from './tools.js';

export default class App {
  constructor() {
    this.game = new Game('AhKw5EHLGJbl7XkOdSHt');
  }

  run = () => {
    this.form = selector('.add-score form');
    selector('.refresh').addEventListener('click', () => this.displayScores);
    selector('.add-score button').addEventListener('click', (event) => {
      event.preventDefault();
      if (this.form.elements.name.value && this.form.elements.score.value) {
        selector('small').classList.add('hidden');
        this.registerNewScore(this.form.elements.name.value, this.form.elements.score.value);
      } else {
        selector('small').classList.remove('hidden');
      }
    });

    this.displayScores();
  };

  displayScores = async () => {
    const scores = await this.game.getScores();

    if (scores.length === 0) {
      selector('ul').innerHTML = 'No score registered.';
    } else {
      selector('ul').innerHTML = '';
      scores.forEach((score) => {
        this.displayScore(score);
      });
    }
  };

  registerNewScore = async (user, score) => {
    const newScore = await this.game.addScore(user, score);
    this.form.reset();
    this.displayScore(newScore);
  };

  displayScore = (score) => {
    selector('ul').innerHTML += `<li>${score.user}: <span> ${score.score} </span></li>`;
  };
}
