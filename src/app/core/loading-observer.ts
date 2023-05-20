import { OnDestroy, Injectable } from '@angular/core';
import {
  ActionType,
  Actions,
  ofActionCompleted,
  ofActionDispatched,
} from '@ngxs/store';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Injectable()
export class LoadingObserver implements OnDestroy {
  private isLoadingSubject$ = new BehaviorSubject<boolean>(false);
  private onDestroy$ = new Subject<void>();
  public isLoading$ = this.isLoadingSubject$.asObservable();

  protected constructor(private actions$: Actions) {}

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  protected observeLoadingActions(actions: ActionType[]): void {
    this.actions$
      .pipe(ofActionDispatched(...actions), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.isLoadingSubject$.next(true);
      });

    this.actions$
      .pipe(ofActionCompleted(...actions), takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.isLoadingSubject$.next(false);
      });
  }
}
