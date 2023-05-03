import { Map } from 'src/app/core/models/map';

export class Util {
  public static mapsWithImagePath(
    game: 'valorant' | 'csgo',
    mapNames: string[]
  ): Map[] {
    return mapNames.map((mapName) => ({
      name: mapName,
      image: `../../../../../assets/images/maps/${game}/${mapName}.jpg`,
    }));
  }

  public static getColorByPlayerElo(elo: number): string {
    return elo >= 8
      ? 'rgb(241, 49, 49)'
      : elo >= 5
      ? 'rgb(238, 238, 97)'
      : elo >= 3
      ? 'rgb(13, 152, 245)'
      : 'white';
  }
}
