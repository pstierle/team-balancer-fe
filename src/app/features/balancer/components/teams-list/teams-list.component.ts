import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/core/models/player';
import { BaseGame } from 'src/app/core/models/base-game';
import { Select, Store } from '@ngxs/store';
import {
  BalancerStateSelectors,
  GenerateTeams,
  RemovePlayer,
  SelectBaseGame,
} from 'src/app/state/balancer.state';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
})
export class TeamsListComponent implements OnInit {
  @Select(BalancerStateSelectors.getFirstTeam)
  public firstTeam$!: Observable<Player[]>;

  @Select(BalancerStateSelectors.getSecondTeam)
  public secondTeam$!: Observable<Player[]>;

  @Select(BalancerStateSelectors.getBaseGames)
  public baseGames$!: Observable<BaseGame[]>;

  @Select(BalancerStateSelectors.getCanShuffle)
  public canShuffle$!: Observable<boolean>;

  @Select(BalancerStateSelectors.getSelectedBaseGameId)
  public selectedBaseGameId$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  public removePlayer(player: Player): void {
    this.store.dispatch(new RemovePlayer(player));
  }

  public getElo$(player: Player): Observable<number> {
    return this.selectedBaseGameId$.pipe(
      map(
        (baseGameId) =>
          player.games.find((game) => game.baseGame.id === baseGameId)?.elo ?? 0
      )
    );
  }

  public generateTeams(): void {
    this.store.dispatch(new GenerateTeams());
  }

  public handleBaseGameChange(id: number): void {
    this.store.dispatch(new SelectBaseGame(id));
  }
}
