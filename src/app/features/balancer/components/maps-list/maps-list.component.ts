import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import { csgoMaps } from 'src/app/core/constants/csgo-maps.constant';
import { valorantMaps } from 'src/app/core/constants/valorant-maps.constant';
import { Map } from 'src/app/core/models/map';
import { Util } from 'src/app/core/util';
import { BalancerStateSelectors } from 'src/app/state/balancer.state';

@Component({
  selector: 'app-maps-list',
  templateUrl: './maps-list.component.html',
  styleUrls: ['./maps-list.component.scss'],
})
export class MapsListComponent {
  @Select(BalancerStateSelectors.getSelectedBaseGameId)
  public selectedBaseGameId$!: Observable<number>;

  public mapList$: Observable<Map[]> = this.selectedBaseGameId$.pipe(
    map((id) => {
      if (id === 1) {
        return Util.mapsWithImagePath('valorant', valorantMaps);
      }
      if (id === 3) {
        return Util.mapsWithImagePath('csgo', csgoMaps);
      }
      return [];
    })
  );

  public highlightedMapIndex: number = -1;

  public highlightRandomMap(): void {
    const randomIndex = Math.floor(Math.random() * 10);
    this.highlightedMapIndex = randomIndex;
    document.getElementById('map-' + randomIndex)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }
}
