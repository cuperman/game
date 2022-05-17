import { Menu, MenuSettings } from './menu';
import { Screen } from '../screen';
import { requestAnimationFrame } from '../lib';
import { Bill, ICharacter, Link, Mario, MegaMan, Ryu, Samus, Simon } from '../characters';
import { Controller } from '../controller';

export interface CharacterMenuSettings extends MenuSettings {
  readonly character: ICharacter;
}

export interface CharacterOption {
  readonly name: string;
  readonly class?: Object;
  readonly sprites: string;
  readonly profileX: number;
  readonly profileY: number;
}

export class CharacterMenu extends Menu {
  private characters: ICharacter[];
  private cursorIndex: number;
  private selected: boolean;

  constructor() {
    super();

    this.characters = [new Simon(), new Bill(), new Mario(), new MegaMan(), new Samus(), new Ryu(), new Link()];
    this.cursorIndex = 0;
    this.selected = false;
  }

  cursorUp() {
    return;
  }

  cursorDown() {
    return;
  }

  cursorLeft() {
    if (this.cursorIndex > 0) {
      this.cursorIndex -= 1;
    }
  }

  cursorRight() {
    if (this.cursorIndex < this.characters.length - 1) {
      this.cursorIndex += 1;
    }
  }

  select() {
    this.selected = true;
  }

  async load() {
    return await Promise.all(this.characters.map((character) => character.load()));
  }

  processInput(controller: Controller): void {
    if (controller.action || controller.start) {
      this.select();
      controller.releaseAction();
      controller.releaseStart();
    } else if (controller.left) {
      this.cursorLeft();
      controller.releaseLeft();
    } else if (controller.right) {
      this.cursorRight();
      controller.releaseRight();
    }
  }

  render(screen: Screen, elapsed: DOMHighResTimeStamp) {
    screen.drawRectangle(0, 0, screen.width, screen.height, { color: 'DarkSlateBlue', fill: true });

    const paddingEdge = 4;
    const paddingMiddle = 6;
    const size = 32;

    const xOffset = 24;
    const yOffset = 60;

    screen.drawText('Choose a character', xOffset, 32, { fontSize: 18 });

    this.characters.forEach(async (character, i) => {
      const profile = await character.profileImage();
      const dx = paddingEdge + i * paddingMiddle + i * size;
      const dy = paddingEdge;

      screen.drawSprite(profile, 0, 0, profile.width, profile.height, dx + xOffset, dy + yOffset, size, size);

      if (this.cursorIndex === i) {
        screen.drawRectangle(dx + xOffset, dy + yOffset, size, size, { color: 'White', fill: false });
      }
    });

    const selectedCharacter = this.characters[this.cursorIndex];
    screen.drawText(selectedCharacter.name, xOffset, screen.height - yOffset);
  }

  async open(screen: Screen, controller: Controller): Promise<CharacterMenuSettings> {
    this.selected = false;

    await this.load();
    let lastLoop = await requestAnimationFrame();

    while (!this.selected) {
      const now = await requestAnimationFrame();
      const elapsed = now - lastLoop;
      lastLoop = now;

      this.processInput(controller);
      this.render(screen, elapsed);
    }

    return {
      character: this.characters[this.cursorIndex],
    };
  }
}
