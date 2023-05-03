import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { InitBalancer } from 'src/app/state/balancer.state';

@Component({
  selector: 'app-balancer',
  templateUrl: './balancer.component.html',
  styleUrls: ['./balancer.component.scss'],
})
export class BalancerComponent implements OnInit {
  constructor(private store: Store) {}

  public async ngOnInit(): Promise<void> {
    this.store.dispatch(new InitBalancer());
  }
}
