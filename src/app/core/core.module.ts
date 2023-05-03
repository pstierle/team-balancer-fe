import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './error/global-error-handler';
import { PlayerEloDirective } from './directives/player-elo.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

const coreModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
];

@NgModule({
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  imports: [...coreModules],
  exports: [...coreModules, PlayerEloDirective],
  declarations: [PlayerEloDirective],
})
export class CoreModule {}
