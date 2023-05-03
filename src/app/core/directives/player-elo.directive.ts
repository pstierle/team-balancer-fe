import { Observable, Subscription } from 'rxjs';
import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Util } from '../util';

@Directive({
  selector: '[appPlayerElo]',
})
export class PlayerEloDirective implements OnInit, OnDestroy {
  @Input()
  public appPlayerElo!: Observable<number>;

  private subscription!: Subscription;

  constructor(private elRef: ElementRef) {}

  public ngOnInit(): void {
    this.subscription = this.appPlayerElo.subscribe(
      (v) =>
        (this.elRef.nativeElement.style.color = Util.getColorByPlayerElo(v))
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
