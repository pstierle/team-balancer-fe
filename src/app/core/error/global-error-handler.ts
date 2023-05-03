import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes } from '../constants/app-routes.constant';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private router: Router, private zone: NgZone) {}

  handleError(response: any) {
    console.log(response);
    this.zone.run(() => this.router.navigate([appRoutes.auth]));
  }
}
