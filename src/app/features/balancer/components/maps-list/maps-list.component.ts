import { Component, Input } from '@angular/core';
import { Map } from 'src/app/core/models/map';

@Component({
  selector: 'app-maps-list',
  templateUrl: './maps-list.component.html',
  styleUrls: ['./maps-list.component.scss'],
})
export class MapsListComponent {
  @Input()
  public mapList: Map[] = [];

  public highlightedMapIndex: number | null = null;

  public highlightRandomMap(): void {
    const randomIndex = Math.floor(Math.random() * this.mapList.length);
    this.highlightedMapIndex = randomIndex;
    document.getElementById('map-' + randomIndex)?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
