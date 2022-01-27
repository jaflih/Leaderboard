/* eslint-disable import/prefer-default-export */

export const flappy = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = './image/flappy-bird-set.png';

  let gamePlaying = false;
  const gravity = 0.5;
  const speed = 6.2;
  const size = [51, 36];
  const jump = -11.5;
  const cTenth = canvas.width / 10;

  let index = 0;
  let bestScore = 0;
  let flight;
  let currentScore;
  let lastScore;
  let pipes;
  let flyHeight = canvas.height / 2 - size[1] / 2;

  const pipeWidth = 78;
  const pipeGap = 270;
  const ch = canvas.height - (pipeGap + pipeWidth) - pipeWidth;
  const pipeLoc = () => Math.random() * ch + pipeWidth;

  const setup = () => {
    lastScore = currentScore;
    document.getElementById('lastScore').value = lastScore;

    currentScore = 0;
    document.getElementById('currentScore').innerHTML = currentScore;

    flight = jump;

    flyHeight = canvas.height / 2 - size[1] / 2;

    pipes = Array(3)
      .fill()
      .map((a, i) => [canvas.width + i * (pipeGap + pipeWidth), pipeLoc()]);
  };

  const render = () => {
    index += 1;

    const currentHeight = -((index * (speed / 2)) % canvas.width);
    const cw = canvas.width;
    const ch = canvas.height;
    ctx.drawImage(img, 0, 0, cw, ch, currentHeight + cw, 0, cw, ch);
    ctx.drawImage(img, 0, 0, cw, ch, currentHeight, 0, cw, ch);

    const px = Math.floor((index % 9) / 3) * size[1];

    if (gamePlaying) {
      ctx.drawImage(img, 432, px, ...size, cTenth, flyHeight, ...size);
      flight += gravity;
      flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
    } else {
      ctx.drawImage(img, 432, px, ...size, canvas.width / 2 - size[0] / 2, flyHeight, ...size);
      flyHeight = canvas.height / 2 - size[1] / 2;

      ctx.fillText('Click to play', 90, 535);
      ctx.font = 'bold 30px courier';
    }

    if (gamePlaying) {
      pipes.map((pipe) => {
        pipe[0] -= speed;
        ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
        ctx.drawImage(
          img,
          432 + pipeWidth,
          108,
          pipeWidth,
          canvas.height - pipe[1] + pipeGap,
          pipe[0],
          pipe[1] + pipeGap,
          pipeWidth,
          canvas.height - pipe[1] + pipeGap,
        );

        if (pipe[0] <= -pipeWidth) {
          currentScore += 1;
          document.getElementById('currentScore').innerHTML = currentScore;

          const ph = [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()];
          bestScore = Math.max(bestScore, currentScore);
          pipes = [...pipes.slice(1), ph];
        }

        const v1 = pipe[0] <= cTenth + size[0];
        const v2 = pipe[0] + pipeWidth >= cTenth;
        const v3 = pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1];
        if ([v1, v2, v3].every((elem) => elem)) {
          gamePlaying = false;
          setup();
        }
        return true;
      });
    }

    window.requestAnimationFrame(render);
  };

  setup();
  img.onload = render;
  document.querySelector('canvas').addEventListener('click', () => {
    gamePlaying = true;
  });
  window.onclick = () => {
    flight = jump;
  };
};
