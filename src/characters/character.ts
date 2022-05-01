import { Screen } from '../screen';

export interface Character {
  x: number;
  y: number;
  vx: number;
  vy: number;

  load: () => Promise<void>;
  render: (screen: Screen) => void;
  runRight: () => void;
  runLeft: () => void;
  stop: () => void;
  toString: () => string;
}
