import { ApiService } from 'src/app/core/services/api.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface PlayerForm {
  id: string;
  form: FormGroup<{
    name: FormControl<string | null>;
  }>;
}

interface GameForm {
  id: string;
  form: FormGroup<{
    elo: FormControl<number | null>;
  }>;
}

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  public players$ = this.apiService.players$.asObservable();

  public gameForms: GameForm[] = [];

  public playerForms: PlayerForm[] = [];

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  public async ngOnInit(): Promise<void> {
    this.players$.subscribe((players) => {
      this.gameForms = [];
      this.playerForms = [];
      players.forEach((player) => {
        const playerForm: PlayerForm = {
          id: player.id,
          form: this.formBuilder.group({
            name: new FormControl<string>(player.name),
          }),
        };

        this.playerForms.push(playerForm);

        player.games.forEach((game) => {
          const gameForm: GameForm = {
            id: game.id,
            form: this.formBuilder.group({
              elo: new FormControl<number>(game.elo, [
                Validators.required,
                Validators.min(0),
                Validators.max(10),
              ]),
            }),
          };
          this.gameForms.push(gameForm);
        });
      });
    });

    await this.apiService.getPlayers();
  }

  public getPlayerFormByPlayerId(playerId: string): FormGroup | undefined {
    return this.playerForms.find((playerForm) => playerForm.id === playerId)
      ?.form;
  }

  public getGameFormByGameId(playerId: string): FormGroup | undefined {
    return this.gameForms.find((playerForm) => playerForm.id === playerId)
      ?.form;
  }

  public async updatePlayerGameElo(
    playerId: string,
    gameId: string,
    gameForm: FormGroup
  ): Promise<void> {
    const eloControl = gameForm.controls['elo'];

    if (eloControl.value) {
      try {
        await this.apiService.updatePlayer(playerId, {
          game: {
            id: gameId,
            elo: eloControl.value,
          },
        });
        eloControl.markAsUntouched();
        eloControl.setErrors(null);
        this.snackBar.open('Successfully edited Player', '', {
          duration: 3000,
        });
      } catch (e) {
        this.snackBar.open('Error editing Player', '', {
          duration: 3000,
        });
        await this.apiService.getPlayers();
      }
    }
  }

  public async updatePlayerName(
    playerId: string,
    playerForm: FormGroup
  ): Promise<void> {
    const nameControl = playerForm.controls['name'];

    if (nameControl.value) {
      try {
        await this.apiService.updatePlayer(playerId, {
          name: nameControl.value,
        });
        nameControl.markAsUntouched();
        nameControl.setErrors(null);
        this.snackBar.open('Successfully edited Player', '', {
          duration: 3000,
        });
        await this.apiService.getPlayers();
      } catch (e) {
        this.snackBar.open('Error editing Player', '', {
          duration: 3000,
        });
        await this.apiService.getPlayers();
      }
    }
  }

  public async deletePlayer(playerId: string): Promise<void> {
    await this.apiService.deletePlayer(playerId);
    await this.apiService.getPlayers();
  }
}
