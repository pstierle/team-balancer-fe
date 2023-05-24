import { Observable, map } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Player } from 'src/app/core/models/player';
import { Actions, Select, Store } from '@ngxs/store';
import {
  BalancerStateSelectors,
  GenerateTeams,
} from 'src/app/state/balancer.state';
import { LoadingObserver } from 'src/app/core/loading-observer';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsListComponent extends LoadingObserver implements OnInit {
  @Select(BalancerStateSelectors.getFirstTeam)
  public firstTeam$!: Observable<Player[]>;

  @Select(BalancerStateSelectors.getSecondTeam)
  public secondTeam$!: Observable<Player[]>;

  @Select(BalancerStateSelectors.getCanShuffle)
  public canShuffle$!: Observable<boolean>;

  @Select(BalancerStateSelectors.getSelectedBaseGameId)
  public selectedBaseGameId$!: Observable<number>;

  constructor(private store: Store, actions: Actions) {
    super(actions);
  }

  public ngOnInit(): void {
    this.observeLoadingActions([GenerateTeams]);
  }

  public generateTeams(): void {
    this.store.dispatch(new GenerateTeams());
  }

  public getPlayersEloSum$(players: Player[]): Observable<number> {
    return this.selectedBaseGameId$.pipe(
      map((baseGameId) => {
        let sum = 0;
        players.forEach((player) => {
          player.games.forEach((game) => {
            if (game.baseGame.id === baseGameId) {
              sum += game.elo;
            }
          });
        });
        return sum;
      })
    );
  }
}
