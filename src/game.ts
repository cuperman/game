import { ICharacter } from './characters';
import { Controller } from './controller';
import { IStage } from './stages';
import { Logger } from './lib';
import { Screen } from './screen';
import { CharacterMenu, StageMenu } from './menus';
import { GameOverMenu } from './menus/game_over_menu';

export class Game {
  public controller: Controller;
  public screen: Screen;

  protected logger: Logger;

  private stage: IStage;
  private stageMenu: StageMenu;
  private character: ICharacter;
  private characterMenu: CharacterMenu;
  private gameOverMenu: GameOverMenu;

  constructor() {
    this.screen = new Screen(320, 240);
    this.controller = new Controller();

    this.characterMenu = new CharacterMenu();
    this.stageMenu = new StageMenu();
    this.gameOverMenu = new GameOverMenu();

    this.logger = new Logger();
  }

  async load(): Promise<void> {
    const characterMenuLoaded = this.characterMenu.load();
    const stageMenuLoaded = this.stageMenu.load();
    const gameOverMenuLoaded = this.gameOverMenu.load();

    await Promise.all([characterMenuLoaded, stageMenuLoaded, gameOverMenuLoaded]);
  }

  async start() {
    const characterSettings = await this.characterMenu.open(this.screen, this.controller);
    this.character = characterSettings.character;

    this.logger.info(`character ${this.character.name} was chosen!`);

    const stageSettings = await this.stageMenu.open();
    this.stage = stageSettings.stage;

    await this.stage.play(this.screen, this.controller, this.character);

    this.gameOverMenu.open(this.screen);
  }
}
