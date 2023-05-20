import { BaseGame } from './base-game';

export interface Game {
  id: number;
  elo: number;
  baseGame: BaseGame;
}
