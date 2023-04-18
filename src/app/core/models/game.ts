import { BaseGame } from './base-game';

export interface Game {
  id: string;
  elo: number;
  baseGame: BaseGame;
}
