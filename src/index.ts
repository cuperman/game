import { Game } from './game';

async function main() {
  const game = new Game();

  document.body.appendChild(game.canvas.element);
  document.body.addEventListener('keyup', (event) => game.controller.onKeyUp(event));
  document.body.addEventListener('keydown', (event) => game.controller.onKeyDown(event));

  game.load().then(() => {
    game.start();
  });
}

main();
