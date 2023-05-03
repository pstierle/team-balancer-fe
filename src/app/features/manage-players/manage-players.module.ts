import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagePlayersComponent } from './components/manage-players/manage-players.component';
import { ManagePlayersRoutingModule } from './manage-players-routing.module';

@NgModule({
  declarations: [
    ManagePlayersComponent,
    AddPlayerComponent,
    PlayerListComponent,
  ],
  imports: [CommonModule, SharedModule, ManagePlayersRoutingModule],
})
export class ManagePlayersModule {}
