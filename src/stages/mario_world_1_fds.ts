import { SideScrollingStage } from './side_scrolling_stage';

export class MarioWorld1Fds extends SideScrollingStage {
  constructor() {
    super({
      tileWidth: 16,
      tileHeight: 16,
      backgroundImagePath: '/img/mario-world-1-fds.png',
      backgroundTileMap: `
      ....................................................................................................................................................................
      ....................................................................................................................................................................
      ....................................................................................................................................................................
      ....................................................................................................................................................................
      ........................................#######.....................................................................................................................
      ..........................#####.............................####..............................................................................##....................
      ............................................................................######............................................................##....................
      ........................................................................................................########............................####....................
      ...................................#####....................................................................................................####....................
      ........................########......................................###...........................................####..####............######....................
      ...........................................................#..............................................................................######....................
      ..................................................................................................####....................................######....................
      ..................####..........###.......................................................................................................######........#...........
      ################..................................####.....#####.#####...........................................###.............###################################
      ################.................................................................................................................###################################
      `,
    });
  }
}
