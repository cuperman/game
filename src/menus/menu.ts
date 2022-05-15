import { Screen } from '../screen';

export interface MenuSettings {
  //
}

export interface IMenu {
  load: () => Promise<void>;
  render: (screen: Screen) => void;

  cursorUp: () => void;
  cursorDown: () => void;
  cursorLeft: () => void;
  cursorRight: () => void;
  select: () => void;
  open: () => Promise<MenuSettings>;
}

export class Menu {
  constructor() {
    return;
  }
}
