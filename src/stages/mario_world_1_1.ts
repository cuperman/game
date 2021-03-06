import { SideScrollingStage } from './side_scrolling_stage';

export class MarioWorld11 extends SideScrollingStage {
  constructor() {
    super({
      tileWidth: 16,
      tileHeight: 16,
      backgroundImagePath: '/img/mario-world-1-1.png',
      backgroundTileMap: `
...................................................................................................................................................................................................................
...................................................................................................................................................................................................................
...................................................................................................................................................................................................................
...................................................................................................................................................................................................................
...................................................................................................................................................................................................................
......................#.........................................................########...####..............#...........###....####........................................................##.....................
...........................................................................................................................................................................................###.....................
..........................................................................................................................................................................................####.....................
.........................................................................................................................................................................................#####.....................
................#...#####.....................##.........##..................###..............#.....##....#..#..#.....#..........##......#..#..........##..#............####............######.....................
......................................##......##.........##.............................................................................##..##........###..##..........................#######.....................
............................##........##......##.........##............................................................................###..###......####..###.....##..............##.########.....................
............................##........##......##.........##...........................................................................####..####....#####..####....##..............###########........#............
#####################################################################..###############...################################################################..########################################################
#####################################################################..###############...################################################################..########################################################
      `,
    });
  }

  async load() {
    await super.load();

    // restrict height
    this.pixelHeight = 240;
    this.gridHeight = Math.floor(this.pixelHeight / this.tileHeight);
  }
}
