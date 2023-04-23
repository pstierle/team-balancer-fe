import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { endpoints } from '../constants/endpoints.constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../models/player';
import { BaseGame } from '../models/base-game';
import { GenerateTeamsResponse } from '../models/generate-teams-response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public accessToken = '';
  public players$ = new BehaviorSubject<Player[]>([]);

  private get authHeader(): any {
    return {
      authorization: 'Bearer ' + this.accessToken,
    };
  }

  constructor(private httpClient: HttpClient) {}

  public login(): void {
    window.location.href = `${environment.apiUrl}/${endpoints.auth.basePath}/${endpoints.auth.login}`;
  }

  public getBaseGames$(): Observable<BaseGame[]> {
    return this.httpClient.get<BaseGame[]>(
      `${environment.apiUrl}/${endpoints.baseGame.basePath}`,
      {
        headers: this.authHeader,
      }
    );
  }

  public generateTeams$(
    baseGameId: number,
    playerIds: string[]
  ): Observable<GenerateTeamsResponse> {
    return this.httpClient.post<GenerateTeamsResponse>(
      `${environment.apiUrl}/${endpoints.baseGame.basePath}/${endpoints.baseGame.generateTeams}`,
      {
        baseGameId,
        playerIds,
      },
      {
        headers: this.authHeader,
      }
    );
  }

  public async createPlayer(name: string): Promise<void> {
    await this.httpClient
      .post(
        `${environment.apiUrl}/${endpoints.player.basePath}`,
        {
          name,
        },
        {
          headers: this.authHeader,
        }
      )
      .toPromise();
  }

  public async getPlayers(): Promise<void> {
    const players = await this.httpClient
      .get<Player[]>(`${environment.apiUrl}/${endpoints.player.basePath}`, {
        headers: this.authHeader,
      })
      .toPromise();

    this.players$.next(
      players?.sort((a, b) => a.name.localeCompare(b.name)) ?? []
    );
  }

  public async updatePlayer(
    id: string,
    data: {
      name?: string;
      game?: {
        id: string;
        elo: number;
      };
    }
  ): Promise<void> {
    await this.httpClient
      .patch(
        `${environment.apiUrl}/${endpoints.player.basePath}/${id}`,
        { ...data },
        {
          headers: this.authHeader,
        }
      )
      .toPromise();
  }

  public async deletePlayer(id: string): Promise<void> {
    await this.httpClient
      .delete(`${environment.apiUrl}/${endpoints.player.basePath}/${id}`, {
        headers: this.authHeader,
      })
      .toPromise();
  }
}
