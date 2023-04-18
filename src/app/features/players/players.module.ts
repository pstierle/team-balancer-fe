import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './components/players/players.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PlayersComponent, AddPlayerComponent, PlayerListComponent],
  imports: [CommonModule, PlayersRoutingModule, SharedModule],
})
export class PlayersModule {}
