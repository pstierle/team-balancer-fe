import { ApiService } from 'src/app/core/services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Game } from 'src/app/core/models/game';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  public players$ = this.apiService.players$.asObservable();

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  public async ngOnInit(): Promise<void> {
    await this.apiService.getPlayers();
  }

  public async updatePlayerGameElo(
    playerId: string,
    gameId: string,
    event: any
  ): Promise<void> {
    const game = this.apiService.players$.value
      .find((player) => player.id === playerId)
      ?.games.find((game) => game.id === gameId);

    const value = Number(event.target.value);

    if (game?.elo === value || value < 1 || value > 10) {
      return;
    }
    try {
      await this.apiService.updatePlayer(playerId, {
        game: {
          id: gameId,
          elo: event.target.value,
        },
      });
      this.snackBar.open('Successfully updated Player Elo', '', {
        duration: 3000,
      });
    } catch (e) {
      this.snackBar.open('Error editing Player', '', {
        duration: 3000,
      });
    }
    await this.apiService.getPlayers();
  }

  public async deletePlayer(playerId: string): Promise<void> {
    await this.apiService.deletePlayer(playerId);
    await this.apiService.getPlayers();
  }

  public getSortedPlayerGames(games: Game[]): Game[] {
    return games.sort((a, b) => a.baseGame.name.localeCompare(b.baseGame.name));
  }
}
