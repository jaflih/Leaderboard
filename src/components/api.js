export default class API {
  newGame = () => {
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'My cool new game',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => json);
  };

  static getScores = async (idGame) => {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${idGame}/scores/`);
    const data = await response.json();
    return data;
  };

  static addScore = async (idGame, name, userScore) => {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${idGame}/scores/`, {
      method: 'POST',
      body: JSON.stringify({
        user: name,
        score: userScore,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    return data;
  };
}
