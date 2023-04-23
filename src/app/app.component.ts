import { Component, OnInit } from '@angular/core';
import { appRoutes } from './core/constants/app-routes.constant';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { ApiService } from './core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public appRoutes = appRoutes;
  public sideNavOpen: boolean = false;

  constructor(private apiService: ApiService) {}

  public async ngOnInit(): Promise<void> {
    const accessToken = localStorage.getItem('access_token');
    this.apiService.accessToken = accessToken ?? '';
  }

  public login(): void {
    this.apiService.login();
  }
}
