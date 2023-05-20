import { Component } from '@angular/core';
import { endpoints } from 'src/app/core/constants/endpoints.constant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent {
  public login(): void {
    window.location.href = `${environment.apiUrl}/${endpoints.auth.basePath}/${endpoints.auth.login}`;
  }
}
