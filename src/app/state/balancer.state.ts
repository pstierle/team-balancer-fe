import { Injectable } from '@angular/core';
import { StateToken, State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable, tap, combineLatest, of } from 'rxjs';
import { BalancerStateModel } from './models/balancer-state.model';
import { Player } from '../core/models/player';
import { BalancerApiService } from '../core/services/balancer-api.service';
import { BaseGame } from '../core/models/base-game';
import { Map } from '../core/models/map';

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

export class AddPlayer {
  public static type = `${BALANCER_STATE} AddPlayer`;
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

export class GetRandomMap {
  public static type = `${BALANCER_STATE} GetRandomMap`;
  constructor() {}
}

export class ResetRandomMap {
  public static type = `${BALANCER_STATE} ResetRandomMap`;
  constructor() {}
}

export class ToogleMap {
  public static type = `${BALANCER_STATE} ToogleMap`;
  constructor(public map: Map) {}
}

export class GenerateResultsText {
  public static type = `${BALANCER_STATE} GenerateResultsText`;
  constructor() {}
}

@State<BalancerStateModel>({
  name: BALANCER_STATE_TOKEN,
  defaults: {
    allPlayers: [],
    firstTeam: [],
    secondTeam: [],
    selectedBaseGameId: 0,
    baseGames: [],
    randomMap: undefined,
    selectedMaps: [],
    resultsText: undefined,
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
          allPlayers: data[0],
          baseGames: data[1],
          firstTeam: [],
          secondTeam: [],
          selectedBaseGameId: 0,
          randomMap: undefined,
          selectedMaps: [],
          resultsText: undefined,
        });
      })
    );
  }

  @Action(GenerateResultsText)
  public generateResultsText(ctx: StateContext<BalancerStateModel>): any {
    const state = ctx.getState();
    const baseGame = state.baseGames.find(
      (g) => g.id === state.selectedBaseGameId
    );
    let text = `Selected Game: ${baseGame?.name}\n`;
    text += '\n';
    if (state.randomMap) {
      text += ` Map: ${state.randomMap.name}\n`;
    }
    text += '\n';
    text += ' First Team:\n';
    state.firstTeam.forEach((player, i) => {
      text += `  ${i + 1}. ${player.name}\n`;
    });
    text += '\n';
    text += ' Second Team:\n';
    state.secondTeam.forEach((player, i) => {
      text += `  ${i + 1}. ${player.name}\n`;
    });

    ctx.patchState({
      resultsText: text,
    });
  }

  @Action(GetRandomMap)
  public getRandomMap(
    ctx: StateContext<BalancerStateModel>,
    action: GetRandomMap
  ): Observable<any> {
    const state = ctx.getState();
    return this.apiService
      .getRandomMap({
        maps: state.selectedMaps,
      })
      .pipe(
        tap((data) => {
          ctx.patchState({
            randomMap: data,
          });
        })
      );
  }

  @Action(ResetRandomMap)
  public resetRandomMap(ctx: StateContext<BalancerStateModel>): any {
    ctx.patchState({
      randomMap: undefined,
    });
  }

  @Action(ToogleMap)
  public toogleMap(
    ctx: StateContext<BalancerStateModel>,
    action: ToogleMap
  ): void {
    const state = ctx.getState();
    let selectedMaps = [...state.selectedMaps];
    let index = selectedMaps.findIndex((m) => m.id === action.map.id);
    if (index !== -1) {
      selectedMaps.splice(index, 1);
    } else {
      selectedMaps = [...selectedMaps, action.map];
    }

    ctx.patchState({
      selectedMaps,
    });
  }

  @Action(AddPlayer)
  public addPlayer(
    ctx: StateContext<BalancerStateModel>,
    action: AddPlayer
  ): void {
    const state = ctx.getState();
    let firstTeam = [...state.firstTeam];
    let secondTeam = [...state.secondTeam];

    if (
      firstTeam.length + secondTeam.length >= 10 ||
      !!firstTeam.find((p) => p.id === action.player.id) ||
      !!secondTeam.find((p) => p.id === action.player.id)
    ) {
      return;
    }

    if (firstTeam.length < 5) {
      firstTeam.push(action.player);
    } else {
      secondTeam.push(action.player);
    }

    ctx.patchState({
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
    const state = ctx.getState();

    ctx.patchState({
      selectedBaseGameId: action.id,
      selectedMaps: state.baseGames.find((g) => g.id === action.id)?.maps,
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
  public static getAllPlayers(state: BalancerStateModel): Player[] {
    return state.allPlayers;
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
  public static getSelectedBaseGameId(state: BalancerStateModel): number {
    return state.selectedBaseGameId;
  }

  @Selector([BalancerState])
  public static getRandomMap(state: BalancerStateModel): Map | undefined {
    return state.randomMap;
  }

  @Selector([BalancerState])
  public static getSelectedMaps(state: BalancerStateModel): Map[] {
    return state.selectedMaps;
  }

  @Selector([BalancerState])
  public static getResultsText(state: BalancerStateModel): string | undefined {
    return state.resultsText;
  }

  @Selector([BalancerState])
  public static canCopyResults(state: BalancerStateModel): boolean {
    return (
      !!state.randomMap &&
      state.firstTeam.length === 5 &&
      state.secondTeam.length === 5
    );
  }

  @Selector([BalancerState])
  public static getCanShuffle(state: BalancerStateModel): boolean {
    return (
      state.firstTeam.length + state.secondTeam.length >= 10 &&
      !!state.selectedBaseGameId
    );
  }
}
