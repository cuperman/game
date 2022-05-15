import { IStage, Stage, MarioWorld11, MarioWorld1Fds } from '../stages';
import { Menu, MenuSettings } from './menu';

export interface StageSettings extends MenuSettings {
  readonly stage: IStage;
}

export class StageMenu extends Menu {
  constructor() {
    super();
  }

  async load() {
    return;
  }

  async open() {
    // const stage = new Stage();
    const stage = new MarioWorld11();
    // const stage = new MarioWorld1Fds();

    return { stage };
  }
}
