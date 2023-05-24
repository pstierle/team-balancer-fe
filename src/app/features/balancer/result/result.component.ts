import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  BalancerStateSelectors,
  GenerateResultsText,
} from 'src/app/state/balancer.state';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  @Select(BalancerStateSelectors.canCopyResults)
  public canCopyResults$!: Observable<boolean>;

  @Select(BalancerStateSelectors.getResultsText)
  public resultsText$!: Observable<string>;

  constructor(private store: Store) {}

  public copyResultsText(): void {
    this.store.dispatch(new GenerateResultsText());
  }
}
