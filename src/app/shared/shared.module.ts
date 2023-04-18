import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

const sharedModules = [CoreModule];

@NgModule({
  declarations: [],
  imports: [...sharedModules],
  exports: [...sharedModules],
})
export class SharedModule {}
