import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './error/global-error-handler';

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
  ],
  imports: [...coreModules],
  exports: [...coreModules],
})
export class CoreModule {}
