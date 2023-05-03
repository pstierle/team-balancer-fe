import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { appRoutes } from 'src/app/core/constants/app-routes.constant';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  public async ngOnInit(): Promise<void> {
    localStorage.setItem(
      'access_token',
      this.activatedRoute.snapshot.params['access_token']
    );

    await this.router.navigate([appRoutes.balancer]);
  }
}
