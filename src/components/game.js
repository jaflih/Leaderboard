import API from './api.js';
import Score from './score.js';

export default class Game {
  constructor(id) {
    this.id = id;
  }

  getScores = async () => {
    const data = await API.getScores(this.id);
    return data.result;
  };

  addScore = async (name, score) => {
    const data = await API.addScore(this.id, name, score);
    if (data.result === 'Leaderboard score created correctly.') {
      return new Score(name, score);
    }
    return null;
  };
}
