import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/core/models/player';

@Component({
  selector: 'app-available-players-list',
  templateUrl: './available-players-list.component.html',
  styleUrls: ['./available-players-list.component.scss'],
})
export class AvailablePlayersListComponent {
  @Input()
  public players$!: Observable<Player[]>;

  @Input()
  public disableAdd: boolean = false;

  @Output()
  public playerSelected = new EventEmitter<Player>();

  public selectPlayer(player: Player): void {
    this.playerSelected.emit(player);
  }
}
