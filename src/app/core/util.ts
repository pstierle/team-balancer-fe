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
}
