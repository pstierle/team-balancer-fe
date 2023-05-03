import { BalancerStateModel } from './balancer-state.model';
import { ManagePlayersStateModel } from './manage-players-state.model';

export interface AppStateModel {
  balancerState: BalancerStateModel;
  managePlayersState: ManagePlayersStateModel;
}
