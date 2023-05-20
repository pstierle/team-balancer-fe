import { Observable, map, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import {
  CreatePlayer,
  DeletePlayer,
  GetPlayers,
  ManagePlayersStateSelectors,
  UpdatePlayer,
} from 'src/app/state/manage-players.state';
import { Player } from 'src/app/core/models/player';
import { LoadingObserver } from 'src/app/core/loading-observer';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

interface PlayerWithNameControl extends Player {
  nameControl?: FormControl<string | null>;
}

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent extends LoadingObserver implements OnInit {
  @Select(ManagePlayersStateSelectors.getPlayers)
  public players$!: Observable<Player[]>;

  public playersWithNameControl$: Observable<PlayerWithNameControl[]> =
    this.players$.pipe(
      map((players) => {
        return players.map((player) => ({
          ...player,
          nameControl: new FormControl<string>(player.name, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(12),
          ]),
        }));
      })
    );

  constructor(private store: Store, actions: Actions) {
    super(actions);
  }

  public ngOnInit(): void {
    this.observeLoadingActions([
      GetPlayers,
      UpdatePlayer,
      DeletePlayer,
      CreatePlayer,
    ]);
    this.store.dispatch(new GetPlayers());
  }

  public updatePlayerName(player: PlayerWithNameControl): void {
    if (
      player.nameControl?.valid &&
      player.nameControl?.value &&
      player.nameControl?.value !== player.name
    ) {
      let updatedPlayer = this.playerWithoutNameControl(player);
      updatedPlayer.name = player.nameControl.value;
      this.store.dispatch(
        new UpdatePlayer({
          ...updatedPlayer,
        })
      );
    }
  }

  public updatePlayerGameElo(
    player: PlayerWithNameControl,
    gameId: number,
    event: any
  ): void {
    const value = Number(event.target.value);
    let updatedPlayer = this.playerWithoutNameControl(player);
    let oldElo = null;

    for (let i = 0; i < updatedPlayer.games.length; i++) {
      if (updatedPlayer.games[i].id === gameId) {
        oldElo = updatedPlayer.games[i].elo;
        updatedPlayer.games[i].elo = value;
      }
    }

    if (Number(oldElo) === Number(value)) {
      return;
    }

    this.store.dispatch(
      new UpdatePlayer({
        ...updatedPlayer,
      })
    );
  }

  public deletePlayer(playerId: string): void {
    this.store.dispatch(new DeletePlayer(playerId));
  }

  public getElo$(elo: number): Observable<number> {
    return of(elo);
  }

  private playerWithoutNameControl(player: PlayerWithNameControl): Player {
    let p = { ...player };
    delete p['nameControl'];
    return JSON.parse(JSON.stringify(p));
  }
}
