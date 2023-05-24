import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import { Player } from 'src/app/core/models/player';
import { BalancerStateSelectors } from 'src/app/state/balancer.state';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  @Select(BalancerStateSelectors.getSelectedBaseGameId)
  public selectedBaseGameId$!: Observable<number>;

  @Input()
  public player!: Player;

  public elo$ = this.selectedBaseGameId$.pipe(
    map((id) => this.player.games.find((g) => g.baseGame.id === id)?.elo ?? 0)
  );
}
