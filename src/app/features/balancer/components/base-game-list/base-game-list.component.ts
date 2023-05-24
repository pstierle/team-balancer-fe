import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseGame } from 'src/app/core/models/base-game';
import {
  BalancerStateSelectors,
  ResetRandomMap,
  SelectBaseGame,
} from 'src/app/state/balancer.state';

@Component({
  selector: 'app-base-game-list',
  templateUrl: './base-game-list.component.html',
  styleUrls: ['./base-game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseGameListComponent implements OnInit {
  @Select(BalancerStateSelectors.getBaseGames)
  public baseGames$!: Observable<BaseGame[]>;

  @Select(BalancerStateSelectors.getSelectedBaseGameId)
  public selectedBaseGameId$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.handleBaseGameChange(1);
  }

  public handleBaseGameChange(id: number): void {
    this.store.dispatch(new SelectBaseGame(id));
    this.store.dispatch(new ResetRandomMap());
  }
}
