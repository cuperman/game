import { Simon, Link, Mario, Ryu, Bill, MegaMan, Samus, SpriteCharacterOverrides } from './characters';
import { Screen } from './screen';
import { FrameRate, requestAnimationFrame } from './lib';

async function main() {
  const screen = new Screen(320, 240);
  document.body.appendChild(screen.canvas.element);

  const characterOverrides: SpriteCharacterOverrides = {
    animationFrameRate: FrameRate.TWO_FPS,
    drawBoundingBoxes: true,
  };

  const characters = {
    idle: [
      new Simon(1, 1, characterOverrides),
      new Bill(3, 1, characterOverrides),
      new Mario(5, 1 + 1, characterOverrides),
      new MegaMan(7, 1 + 0.5, characterOverrides),
      new Samus(9, 1, characterOverrides),
      new Ryu(11, 1, characterOverrides),
      new Link(13, 1, characterOverrides),
    ],
    running: [
      new Simon(1, 4, characterOverrides),
      new Bill(3, 4, characterOverrides),
      new Mario(5, 4 + 1, characterOverrides),
      new MegaMan(7, 4 + 0.5, characterOverrides),
      new Samus(9, 4, characterOverrides),
      new Ryu(11, 4, characterOverrides),
      new Link(13, 4, characterOverrides),
    ],
    jumping: [
      new Simon(1, 7, characterOverrides),
      new Bill(3, 7, characterOverrides),
      new Mario(5, 7 + 1, characterOverrides),
      new MegaMan(7, 7 + 0.5, characterOverrides),
      new Samus(9, 7, characterOverrides),
      new Ryu(11, 7, characterOverrides),
      new Link(13, 7, characterOverrides),
    ],
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
