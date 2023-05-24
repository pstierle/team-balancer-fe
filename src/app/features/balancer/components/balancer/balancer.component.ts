import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actions, Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadingObserver } from 'src/app/core/loading-observer';
import {
  BalancerStateSelectors,
  InitBalancer,
} from 'src/app/state/balancer.state';

@Component({
  selector: 'app-balancer',
  templateUrl: './balancer.component.html',
  styleUrls: ['./balancer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalancerComponent extends LoadingObserver implements OnInit {
  @Select(BalancerStateSelectors.canCopyResults)
  public canCopyResults$!: Observable<boolean>;

  constructor(private store: Store, actions$: Actions) {
    super(actions$);
  }

  public async ngOnInit(): Promise<void> {
    this.observeLoadingActions([InitBalancer]);
    this.store.dispatch(new InitBalancer());
  }
}
