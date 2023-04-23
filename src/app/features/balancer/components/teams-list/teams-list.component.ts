import {
  Observable,
  map,
  BehaviorSubject,
  combineLatest,
  take,
  mergeMap,
  of,
} from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/core/models/player';
import { BaseGame } from 'src/app/core/models/base-game';
import { ApiService } from 'src/app/core/services/api.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
})
export class TeamsListComponent implements OnInit {
  @Input()
  public players$!: Observable<Player[]>;

  public firstTeamPlayers$ = new BehaviorSubject<Player[]>([]);

  public secondTeamPlayers$ = new BehaviorSubject<Player[]>([]);

  public baseGames$!: Observable<BaseGame[]>;

  public selectedBaseGameId$ = new BehaviorSubject<number | null>(null);

  public canShuffle$!: Observable<boolean>;

  @Output()
  public playerRemoved = new EventEmitter<Player>();

  @Output()
  public baseGameSelected = new EventEmitter<number>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.players$.subscribe((players) => {
      this.firstTeamPlayers$.next(players.filter((player, i) => i <= 4));
      this.secondTeamPlayers$.next(players.filter((player, i) => i >= 5));
    });

    this.canShuffle$ = combineLatest([
      this.firstTeamPlayers$,
      this.secondTeamPlayers$,
      this.selectedBaseGameId$,
    ]).pipe(
      map((data) => {
        return data[0].length + data[1].length === 10 && !!data[2];
      })
    );

    this.baseGames$ = this.apiService.getBaseGames$();
  }

  public removePlayer(player: Player): void {
    this.playerRemoved.emit(player);
  }

  public handleBaseGameChange(event: MatSelectChange): void {
    this.selectedBaseGameId$.next(event.value);
    this.baseGameSelected.emit(this.selectedBaseGameId$.value ?? 0);
  }

  public getElo(player: Player): number {
    return (
      player.games.find(
        (game) => game.baseGame.id === this.selectedBaseGameId$.value
      )?.elo ?? 0
    );
  }

  public generateTeams(): void {
    combineLatest([this.firstTeamPlayers$, this.secondTeamPlayers$])
      .pipe(
        mergeMap((data) => {
          return this.apiService.generateTeams$(
            this.selectedBaseGameId$.value ?? 0,
            [
              ...data[0].map((player) => player.id),
              ...data[1].map((player) => player.id),
            ]
          );
        }),
        take(1)
      )
      .subscribe((response) => {
        this.firstTeamPlayers$.next(response.firstTeamPlayers);
        this.secondTeamPlayers$.next(response.secondTeamPlayers);
      });
  }
}
