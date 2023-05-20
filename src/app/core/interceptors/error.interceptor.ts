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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private zone: NgZone) {}
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
        return of();
      })
    );
  }
}
