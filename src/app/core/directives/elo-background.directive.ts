import { Observable, Subscription } from 'rxjs';
import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Util } from '../util';

@Directive({
  selector: '[appEloBackground]',
})
export class EloBackgroundDirective implements OnInit, OnDestroy {
  @Input()
  public appEloBackground!: Observable<number>;

  private subscription!: Subscription;

  constructor(private elRef: ElementRef) {}

  public ngOnInit(): void {
    this.subscription = this.appEloBackground.subscribe((v) => {
      this.elRef.nativeElement.style.color = 'white';
      this.elRef.nativeElement.style.backgroundColor =
        Util.getBackgroundColorByElo(v);
      this.elRef.nativeElement.style.border =
        'solid 1px ' + Util.getTextColorByElo(v);
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
