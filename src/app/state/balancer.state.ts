import { Injectable } from '@angular/core';
import { StateToken, State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable, tap, combineLatest } from 'rxjs';
import { BalancerStateModel } from './models/balancer-state.model';
import { Player } from '../core/models/player';
import { BalancerApiService } from '../core/services/balancer-api.service';
import { BaseGame } from '../core/models/base-game';

const BALANCER_STATE = 'balancerState';
const BALANCER_STATE_TOKEN = new StateToken<BalancerStateModel>(BALANCER_STATE);

export class InitBalancer {
  public static type = `${BALANCER_STATE} InitBalancer`;
  constructor() {}
}

export class GetAllPlayers {
  public static type = `${BALANCER_STATE} GetAllPlayers`;
  constructor() {}
}

export class SelectPlayer {
  public static type = `${BALANCER_STATE} SelectPlayer`;
  constructor(public player: Player) {}
}

export class RemovePlayer {
  public static type = `${BALANCER_STATE} RemovePlayer`;
  constructor(public player: Player) {}
}

export class SelectBaseGame {
  public static type = `${BALANCER_STATE} SelectBaseGame`;
  constructor(public id: number) {}
}

export class GenerateTeams {
  public static type = `${BALANCER_STATE} GenerateTeams`;
  constructor() {}
}

@State<BalancerStateModel>({
  name: BALANCER_STATE_TOKEN,
  defaults: {
    availablePlayers: [],
    firstTeam: [],
    secondTeam: [],
    selectedBaseGameId: 0,
    baseGames: [],
  },
})
@Injectable()
export class BalancerState {
  constructor(private apiService: BalancerApiService) {}

  @Action(InitBalancer)
  public initBalancer(ctx: StateContext<BalancerStateModel>): Observable<any> {
    return combineLatest([
      this.apiService.getAllPlayers(),
      this.apiService.getBaseGames(),
    ]).pipe(
      tap((data) => {
        ctx.patchState({
          availablePlayers: data[0],
          baseGames: data[1],
          firstTeam: [],
          secondTeam: [],
        });
      })
    );
  }

  @Action(SelectPlayer)
  public selectPlayer(
    ctx: StateContext<BalancerStateModel>,
    action: SelectPlayer
  ): void {
    const state = ctx.getState();
    let firstTeam = [...state.firstTeam];
    let secondTeam = [...state.secondTeam];

    if (firstTeam.length < 5) {
      firstTeam.push(action.player);
    } else {
      secondTeam.push(action.player);
    }

    ctx.patchState({
      availablePlayers: state.availablePlayers.filter(
        (player) => player.id !== action.player.id
      ),
      firstTeam,
      secondTeam,
    });
  }

  @Action(RemovePlayer)
  public removePlayer(
    ctx: StateContext<BalancerStateModel>,
    action: RemovePlayer
  ): void {
    const state = ctx.getState();

    ctx.patchState({
      availablePlayers: [...state.availablePlayers, action.player],
      firstTeam: state.firstTeam.filter(
        (player) => player.id !== action.player.id
      ),
      secondTeam: state.secondTeam.filter(
        (player) => player.id !== action.player.id
      ),
    });
  }

  @Action(SelectBaseGame)
  public selectBaseGame(
    ctx: StateContext<BalancerStateModel>,
    action: SelectBaseGame
  ): void {
    ctx.patchState({
      selectedBaseGameId: action.id,
    });
  }

  @Action(GenerateTeams)
  public generateTeams(ctx: StateContext<BalancerStateModel>): Observable<any> {
    const state = ctx.getState();

    const playerIds: string[] = [...state.firstTeam, ...state.secondTeam].map(
      (player) => player.id
    );

    return this.apiService
      .generateTeams(state.selectedBaseGameId, playerIds)
      .pipe(
        tap((data) => {
          ctx.patchState({
            firstTeam: data.firstTeamPlayers,
            secondTeam: data.secondTeamPlayers,
          });
        })
      );
  }
}

@Injectable()
export class BalancerStateSelectors {
  @Selector([BalancerState])
  public static getAvailablePlayers(state: BalancerStateModel): Player[] {
    return state.availablePlayers;
  }

  @Selector([BalancerState])
  public static getFirstTeam(state: BalancerStateModel): Player[] {
    return state.firstTeam;
  }

  @Selector([BalancerState])
  public static getSecondTeam(state: BalancerStateModel): Player[] {
    return state.secondTeam;
  }

  @Selector([BalancerState])
  public static getBaseGames(state: BalancerStateModel): BaseGame[] {
    return state.baseGames;
  }

  @Selector([BalancerState])
  public static getDisableAddPlayers(state: BalancerStateModel): boolean {
    return state.firstTeam.length + state.secondTeam.length >= 10;
  }

  @Selector([BalancerState])
  public static getSelectedBaseGameId(state: BalancerStateModel): number {
    return state.selectedBaseGameId;
  }

  @Selector([BalancerState])
  public static getCanShuffle(state: BalancerStateModel): boolean {
    return (
      state.firstTeam.length + state.secondTeam.length >= 10 &&
      !!state.selectedBaseGameId
    );
  }
}
