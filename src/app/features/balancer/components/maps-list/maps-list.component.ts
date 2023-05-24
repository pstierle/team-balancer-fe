import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import { Observable, combineLatest, map } from 'rxjs';
import { LoadingObserver } from 'src/app/core/loading-observer';
import { BaseGame } from 'src/app/core/models/base-game';
import { Map } from 'src/app/core/models/map';
import {
  BalancerStateSelectors,
  GetRandomMap,
  ResetRandomMap,
  ToogleMap,
} from 'src/app/state/balancer.state';

@Component({
  selector: 'app-maps-list',
  templateUrl: './maps-list.component.html',
  styleUrls: ['./maps-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapsListComponent extends LoadingObserver implements OnInit {
  @Select(BalancerStateSelectors.getSelectedBaseGameId)
  public selectedBaseGameId$!: Observable<number>;

  @Select(BalancerStateSelectors.getBaseGames)
  public baseGames$!: Observable<BaseGame[]>;

  @Select(BalancerStateSelectors.getRandomMap)
  public randomMap$!: Observable<Map>;

  @Select(BalancerStateSelectors.getSelectedMaps)
  public selectedMaps$!: Observable<Map[]>;

  public mapList$: Observable<Map[]> = combineLatest([
    this.selectedBaseGameId$,
    this.baseGames$,
  ]).pipe(
    map((data) => {
      const selectedBaseGameId = data[0];
      const baseGames = data[1];

      return baseGames.find((b) => b.id === selectedBaseGameId)?.maps ?? [];
    })
  );

  constructor(private store: Store, actions: Actions) {
    super(actions);
  }

  public ngOnInit(): void {
    this.observeLoadingActions([GetRandomMap]);
  }

  public getRandomMap(): void {
    this.store.dispatch(new GetRandomMap());
  }

  public resetRandomMap(): void {
    this.store.dispatch(new ResetRandomMap());
  }

  public toogleMap(map: Map): void {
    this.store.dispatch(new ToogleMap(map));
  }

  public isSelected$(id: number): Observable<boolean> {
    return this.selectedMaps$.pipe(
      map((maps) => !!maps.find((m) => m.id === id))
    );
  }
}
