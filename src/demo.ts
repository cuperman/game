import { Link, Mario } from './characters';
import { Screen } from './screen';
import { requestAnimationFrame } from './lib';

async function main() {
  const screen = new Screen(320, 240);
  document.body.appendChild(screen.canvas.element);

  const characters = {
    idle: [new Mario(1, 1), new Link(3, 1)],
    running: [new Mario(1, 4), new Link(3, 4)],
    jumping: [new Mario(1, 7), new Link(3, 7)],
  };

  await Promise.all(
    characters.idle.map(async (character) => {
      await character.load();
      character.runRight();
      character.stop();
      character.land();
    }),
  );

  await Promise.all(
    characters.running.map(async (character) => {
      await character.load();
      character.land();
      character.runRight();
    }),
  );

  await Promise.all(
    characters.jumping.map(async (character) => {
      await character.load();
      character.runRight();
      character.jumpRight();
    }),
  );

  let lastLoop = await requestAnimationFrame();

  while (true) {
    const now = await requestAnimationFrame();
    const elapsed = now - lastLoop;
    lastLoop = now;

    screen.drawRectangle(0, 0, 320, 240, { color: 'LightSkyBlue', fill: true });
    characters.idle.forEach((character) => {
      character.render(screen, elapsed);
    });
    characters.running.forEach((character) => {
      character.render(screen, elapsed);
    });
    characters.jumping.forEach((character) => {
      character.render(screen, elapsed);
    });
  }
}

main();
