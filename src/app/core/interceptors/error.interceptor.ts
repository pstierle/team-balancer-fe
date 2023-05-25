import { Injectable, NgZone } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { appRoutes } from '../constants/app-routes.constant';
import { endpoints } from '../constants/endpoints.constant';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private zone: NgZone,
    private snackBar: MatSnackBar
  ) {}
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.zone.run(() => {
            this.router.navigate(['', appRoutes.auth]);
          });
        }
        if (httpRequest.url.includes(endpoints.player.basePath)) {
          if (error.status === 409) {
            this.snackBar.open('Player names must be unique.', 'Error', {
              duration: 4000,
            });
          }
        }
        if (httpRequest.url.includes(endpoints.baseGame.randomMap)) {
          if (error.status === 400) {
            this.snackBar.open('Select at least one game.', 'Error', {
              duration: 4000,
            });
          }
        }
        return of();
      })
    );
  }
}
