import { BaseGame } from 'src/app/core/models/base-game';
import { Player } from 'src/app/core/models/player';

export interface BalancerStateModel {
  availablePlayers: Player[];
  firstTeam: Player[];
  secondTeam: Player[];
  selectedBaseGameId: number;
  baseGames: BaseGame[];
}
