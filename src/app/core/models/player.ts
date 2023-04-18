import { Game } from './game';

export interface Player {
  id: string;
  name: string;
  games: Game[];
}
