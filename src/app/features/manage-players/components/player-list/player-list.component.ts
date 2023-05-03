import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Game } from 'src/app/core/models/game';
import {
  DeletePlayer,
  GetPlayers,
  ManagePlayersStateSelectors,
  UpdatePlayer,
} from 'src/app/state/manage-players.state';
import { Player } from 'src/app/core/models/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  @Select(ManagePlayersStateSelectors.getPlayers)
  public players$!: Observable<Player[]>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetPlayers());
  }

  public async updatePlayerGameElo(
    playerId: string,
    gameId: string,
    event: any
  ): Promise<void> {
    const value = Number(event.target.value);

    this.store.dispatch(
      new UpdatePlayer(playerId, {
        game: {
          id: gameId,
          elo: value,
        },
      })
    );
  }

  public async deletePlayer(playerId: string): Promise<void> {
    this.store.dispatch(new DeletePlayer(playerId));
  }
}
