import { Screen } from '../screen';

export interface Stage {
  width: number;
  height: number;

  load: () => Promise<void>;
  render: (screen: Screen) => void;
}
