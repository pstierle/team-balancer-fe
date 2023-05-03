import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { endpoints } from '../constants/endpoints.constant';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { BaseGame } from '../models/base-game';
import { GenerateTeamsResponse } from '../models/responses/generate-teams-response';

@Injectable({
  providedIn: 'root',
})
export class BalancerApiService {
  constructor(private httpClient: HttpClient) {}

  public getBaseGames(): Observable<BaseGame[]> {
    return this.httpClient.get<BaseGame[]>(
      `${environment.apiUrl}/${endpoints.baseGame.basePath}`
    );
  }

  public getAllPlayers(): Observable<Player[]> {
    return this.httpClient.get<Player[]>(
      `${environment.apiUrl}/${endpoints.player.basePath}`
    );
  }

  public generateTeams(
    baseGameId: number,
    playerIds: string[]
  ): Observable<GenerateTeamsResponse> {
    return this.httpClient.post<GenerateTeamsResponse>(
      `${environment.apiUrl}/${endpoints.baseGame.basePath}/${endpoints.baseGame.generateTeams}`,
      {
        baseGameId,
        playerIds,
      }
    );
  }
}
