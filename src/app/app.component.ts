import { Component } from '@angular/core';
import { appRoutes } from './core/constants/app-routes.constant';
import { environment } from 'src/environments/environment';
import { endpoints } from './core/constants/endpoints.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public appRoutes = appRoutes;
  public sideNavOpen: boolean = false;

  constructor() {}

  public login(): void {
    window.location.href = `${environment.apiUrl}/${endpoints.auth.basePath}/${endpoints.auth.login}`;
  }
}
