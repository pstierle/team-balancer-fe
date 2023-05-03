import { Game } from '../game';

export interface UpdatePlayerRequest {
  game: Partial<Game>;
}
