import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { csgoMaps } from 'src/app/core/constants/csgo-maps.constant';
import { valorantMaps } from 'src/app/core/constants/valorant-maps.constant';
import { Map } from 'src/app/core/models/map';
import { Player } from 'src/app/core/models/player';
import { ApiService } from 'src/app/core/services/api.service';
import { Util } from 'src/app/core/util';

@Component({
  selector: 'app-balancer',
  templateUrl: './balancer.component.html',
  styleUrls: ['./balancer.component.scss'],
})
export class BalancerComponent implements OnInit {
  public availablePlayers$!: Observable<Player[]>;
  public selectedPlayers$ = new BehaviorSubject<Player[]>([]);
  public disableAdd$ = this.selectedPlayers$.pipe(
    map((player) => player.length >= 10)
  );
  public selectedBaseGameId$ = new BehaviorSubject<number | null>(null);
  public mapsList$: Observable<Map[]> = this.selectedBaseGameId$.pipe(
    map((id) => {
      if (id === 1) {
        return Util.mapsWithImagePath('valorant', valorantMaps);
      }
      if (id === 3) {
        return Util.mapsWithImagePath('csgo', csgoMaps);
      }
      return [];
    })
  );

  constructor(private apiService: ApiService) {}

  public async ngOnInit(): Promise<void> {
    this.availablePlayers$ = combineLatest([
      this.selectedPlayers$.asObservable(),
      this.apiService.players$.asObservable(),
    ]).pipe(
      map((data) => {
        const selectedPlayers = data[0];
        const allPlayers = data[1];
        return allPlayers.filter((player) => !selectedPlayers.includes(player));
      })
    );

    await this.apiService.getPlayers();
  }

  public handlePlayerSelected(player: Player): void {
    this.selectedPlayers$.next([...this.selectedPlayers$.value, player]);
  }

  public handleBaseGameSelected(id: number): void {
    this.selectedBaseGameId$.next(id);
  }

  public handlePlayerRemoved(player: Player): void {
    this.selectedPlayers$.next(
      this.selectedPlayers$.value.filter((p) => p.id !== player.id)
    );
  }
}
