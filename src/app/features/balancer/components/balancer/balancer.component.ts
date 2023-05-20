import { Component, OnInit } from '@angular/core';
import { Actions, Store, ofActionDispatched } from '@ngxs/store';
import { LoadingObserver } from 'src/app/core/loading-observer';
import { InitBalancer } from 'src/app/state/balancer.state';

@Component({
  selector: 'app-balancer',
  templateUrl: './balancer.component.html',
  styleUrls: ['./balancer.component.scss'],
})
export class BalancerComponent extends LoadingObserver implements OnInit {
  constructor(private store: Store, actions$: Actions) {
    super(actions$);
  }

  public async ngOnInit(): Promise<void> {
    this.observeLoadingActions([InitBalancer]);
    this.store.dispatch(new InitBalancer());
  }
}
