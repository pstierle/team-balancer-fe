import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Player } from 'src/app/core/models/player';
import { SelectPlayer } from 'src/app/state/balancer.state';
import { AppStateModel } from 'src/app/state/models/app-state.model';

@Component({
  selector: 'app-available-players-list',
  templateUrl: './available-players-list.component.html',
  styleUrls: ['./available-players-list.component.scss'],
})
export class AvailablePlayersListComponent {
  @Select((state: AppStateModel) => state.balancerState.availablePlayers)
  public availablePlayers$!: Observable<Player[]>;

  public disableAdd: boolean = false;

  constructor(private store: Store) {}

  public selectPlayer(player: Player): void {
    this.store.dispatch(new SelectPlayer(player));
  }
}
