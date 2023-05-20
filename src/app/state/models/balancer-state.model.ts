import { BaseGame } from 'src/app/core/models/base-game';
import { Map } from 'src/app/core/models/map';
import { Player } from 'src/app/core/models/player';

export interface BalancerStateModel {
  allPlayers: Player[];
  firstTeam: Player[];
  secondTeam: Player[];
  selectedBaseGameId: number;
  baseGames: BaseGame[];
  randomMap?: Map;
  selectedMaps: Map[];
}
