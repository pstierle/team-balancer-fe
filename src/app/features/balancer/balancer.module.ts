import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalancerRoutingModule } from './balancer-routing.module';
import { AvailablePlayersListComponent } from './components/available-players-list/available-players-list.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BalancerComponent } from './components/balancer/balancer.component';
import { MapsListComponent } from './components/maps-list/maps-list.component';
import { PlayerComponent } from './components/player/player.component';
import { BaseGameListComponent } from './components/base-game-list/base-game-list.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [AvailablePlayersListComponent, TeamsListComponent, BalancerComponent, MapsListComponent, PlayerComponent, BaseGameListComponent, ResultComponent],
  imports: [CommonModule, BalancerRoutingModule, SharedModule],
})
export class BalancerModule {}
