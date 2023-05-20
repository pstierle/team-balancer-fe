import { Observable, Subscription } from 'rxjs';
import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Util } from '../util';

@Directive({
  selector: '[appEloColor]',
})
export class EloColorDirective implements OnInit, OnDestroy {
  @Input()
  public appEloColor!: Observable<number>;

  private subscription!: Subscription;

  constructor(private elRef: ElementRef) {}

  public ngOnInit(): void {
    this.subscription = this.appEloColor.subscribe((v) => {
      this.elRef.nativeElement.style.color = Util.getTextColorByElo(v);
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
