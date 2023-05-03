import { Injectable } from '@angular/core';
import { StateToken, State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Player } from '../core/models/player';
import { ManagePlayersStateModel } from './models/manage-players-state.model';
import { UpdatePlayerRequest } from '../core/models/requests/update-player.request';
import { CreatePlayerRequest } from '../core/models/requests/create-player.request';
import { ManagePlayersApiService } from '../core/services/manage-players-api.service';

const MANAGE_PLAYERS_STATE = 'managePlayersState';
const MANAGE_PLAYERS_STATE_TOKEN = new StateToken<ManagePlayersStateModel>(
  MANAGE_PLAYERS_STATE
);

export class GetPlayers {
  public static type = `${MANAGE_PLAYERS_STATE} GetPlayers`;
  constructor() {}
}

export class DeletePlayer {
  public static type = `${MANAGE_PLAYERS_STATE} DeletePlayer`;
  constructor(public id: string) {}
}

export class UpdatePlayer {
  public static type = `${MANAGE_PLAYERS_STATE} UpdatePlayer`;
  constructor(public id: string, public request: UpdatePlayerRequest) {}
}

export class CreatePlayer {
  public static type = `${MANAGE_PLAYERS_STATE} CreatePlayer`;
  constructor(public request: CreatePlayerRequest) {}
}

@State<ManagePlayersStateModel>({
  name: MANAGE_PLAYERS_STATE_TOKEN,
  defaults: {
    players: [],
  },
})
@Injectable()
export class ManagePlayersState {
  constructor(private apiService: ManagePlayersApiService) {}

  @Action(GetPlayers)
  public getPlayers(
    ctx: StateContext<ManagePlayersStateModel>
  ): Observable<any> {
    return this.apiService.getAllPlayers().pipe(
      tap((data) => {
        ctx.patchState({
          players: data,
        });
      })
    );
  }

  @Action(DeletePlayer)
  public deletePlayer(
    ctx: StateContext<ManagePlayersStateModel>,
    action: DeletePlayer
  ): Observable<any> {
    return this.apiService.deletePlayer(action.id).pipe(
      tap(() => {
        const state = ctx.getState();

        ctx.patchState({
          players: state.players.filter((player) => player.id !== action.id),
        });
      })
    );
  }

  @Action(UpdatePlayer)
  public updatePlayer(
    ctx: StateContext<ManagePlayersStateModel>,
    action: UpdatePlayer
  ): Observable<any> {
    return this.apiService.updatePlayer(action.id, action.request).pipe(
      tap((player) => {
        const state = ctx.getState();
        let players = [...state.players];
        const index = players.findIndex((player) => player.id === action.id);
        players[index] = player;
        ctx.patchState({
          players,
        });
      })
    );
  }

  @Action(CreatePlayer)
  public createPlayer(
    ctx: StateContext<ManagePlayersStateModel>,
    action: CreatePlayer
  ): Observable<any> {
    return this.apiService.createPlayer(action.request).pipe(
      tap((player) => {
        const state = ctx.getState();
        ctx.patchState({
          players: [...state.players, player].sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        });
      })
    );
  }
}

@Injectable()
export class ManagePlayersStateSelectors {
  @Selector([ManagePlayersState])
  public static getPlayers(state: ManagePlayersStateModel): Player[] {
    return state.players;
  }
}
