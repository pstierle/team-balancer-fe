export class Util {
  public static getTextColorByElo(elo: number): string {
    return elo >= 8 ? '#F9393F' : elo >= 5 ? '#2BDB9E' : '#3273E1';
  }

  public static getBackgroundColorByElo(elo: number): string {
    return elo >= 8 ? '#47233C' : elo >= 5 ? '#264250' : '#1E2B5E';
  }
}
