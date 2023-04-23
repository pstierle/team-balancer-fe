import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalancerComponent } from './components/balancer/balancer.component';

const routes: Routes = [
  {
    path: '',
    component: BalancerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalancerRoutingModule {}
