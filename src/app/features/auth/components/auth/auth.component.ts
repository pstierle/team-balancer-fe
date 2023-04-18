import { ApiService } from './../../../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { appRoutes } from 'src/app/core/constants/app-routes.constant';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.apiService.accessToken =
      this.activatedRoute.snapshot.params['access_token'];

    localStorage.setItem('access_token', this.apiService.accessToken);

    await this.router.navigate([appRoutes.players]);
  }
}
