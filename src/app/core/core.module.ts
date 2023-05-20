import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { EloColorDirective } from './directives/elo-color.directive';
import { EloBackgroundDirective } from './directives/elo-background.directive';

const coreModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
];

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  imports: [...coreModules],
  exports: [...coreModules, EloColorDirective, EloBackgroundDirective],
  declarations: [EloColorDirective, EloBackgroundDirective],
})
export class CoreModule {}
