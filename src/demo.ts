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
      new Simon(characterOverrides),
      new Bill(characterOverrides),
      new Mario(characterOverrides),
      new MegaMan(characterOverrides),
      new Samus(characterOverrides),
      new Ryu(characterOverrides),
      new Link(characterOverrides),
    ],
    running: [
      new Simon(characterOverrides),
      new Bill(characterOverrides),
      new Mario(characterOverrides),
      new MegaMan(characterOverrides),
      new Samus(characterOverrides),
      new Ryu(characterOverrides),
      new Link(characterOverrides),
    ],
    jumping: [
      new Simon(characterOverrides),
      new Bill(characterOverrides),
      new Mario(characterOverrides),
      new MegaMan(characterOverrides),
      new Samus(characterOverrides),
      new Ryu(characterOverrides),
      new Link(characterOverrides),
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
    characters.idle.forEach((character, index) => {
      character.moveTo(1 + index * 2, 1);
      character.render(screen, elapsed);
    });
    characters.running.forEach((character, index) => {
      character.moveTo(1 + index * 2, 4);
      character.render(screen, elapsed);
    });
    characters.jumping.forEach((character, index) => {
      character.moveTo(1 + index * 2, 7);
      character.render(screen, elapsed);
    });
  }
}

main();
