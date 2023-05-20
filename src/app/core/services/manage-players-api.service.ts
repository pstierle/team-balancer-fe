import { CreatePlayerRequest } from './../models/requests/create-player.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { endpoints } from '../constants/endpoints.constant';
import { Observable, map } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class ManagePlayersApiService {
  constructor(private httpClient: HttpClient) {}

  public getAllPlayers(): Observable<Player[]> {
    return this.httpClient
      .get<Player[]>(`${environment.apiUrl}/${endpoints.player.basePath}`)
      .pipe(
        map(
          (players) =>
            players?.sort((a, b) => a.name.localeCompare(b.name)) ?? []
        )
      );
  }

  public createPlayer(request: CreatePlayerRequest): Observable<Player> {
    return this.httpClient.post<Player>(
      `${environment.apiUrl}/${endpoints.player.basePath}`,
      request
    );
  }

  public updatePlayer(request: Player): Observable<Player> {
    return this.httpClient.put<Player>(
      `${environment.apiUrl}/${endpoints.player.basePath}`,
      request
    );
  }

  public deletePlayer(id: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.apiUrl}/${endpoints.player.basePath}`,
      {
        body: {
          id,
        },
      }
    );
  }
}
