import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePlayersComponent {}
