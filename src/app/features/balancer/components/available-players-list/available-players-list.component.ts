import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Player } from 'src/app/core/models/player';
import {
  AddPlayer,
  RemovePlayer,
  BalancerStateSelectors,
} from 'src/app/state/balancer.state';

@Component({
  selector: 'app-available-players-list',
  templateUrl: './available-players-list.component.html',
  styleUrls: ['./available-players-list.component.scss'],
})
export class AvailablePlayersListComponent {
  @Select(BalancerStateSelectors.getAllPlayers)
  public allPlayers$!: Observable<Player[]>;

  @Select(BalancerStateSelectors.getFirstTeam)
  public firstTeam$!: Observable<Player[]>;

  @Select(BalancerStateSelectors.getSecondTeam)
  public secondTeam$!: Observable<Player[]>;

  constructor(private store: Store) {}

  public addPlayer(player: Player): void {
    this.store.dispatch(new AddPlayer(player));
  }

  public removePlayer(player: Player): void {
    this.store.dispatch(new RemovePlayer(player));
  }

  public isSelected$(player: Player): Observable<boolean> {
    return combineLatest([this.firstTeam$, this.secondTeam$]).pipe(
      map((data) => !![...data[0], ...data[1]].find((p) => p.id === player.id))
    );
  }
}
