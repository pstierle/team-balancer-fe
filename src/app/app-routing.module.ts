import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './core/constants/app-routes.constant';

const routes: Routes = [
  {
    path: '',
    redirectTo: appRoutes.balancer,
    pathMatch: 'full',
  },
  {
    path: appRoutes.auth,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: appRoutes.players,
    loadChildren: () =>
      import('./features/manage-players/manage-players.module').then(
        (m) => m.ManagePlayersModule
      ),
  },
  {
    path: appRoutes.balancer,
    loadChildren: () =>
      import('./features/balancer/balancer.module').then(
        (m) => m.BalancerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
