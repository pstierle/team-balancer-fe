import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public showSideNavButton$ = new BehaviorSubject<boolean>(false);
  public sideNavMode$ = new BehaviorSubject<MatDrawerMode>('over');
  private sideNav!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) {}

  public init(sideNav: MatSidenav): void {
    this.sideNav = sideNav;
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.XSmall])
      .subscribe((value) => {
        if (value.matches) {
          this.sideNav.close();
          this.showSideNavButton$.next(true);
          this.sideNavMode$.next('over');
        } else {
          this.sideNav.open();
          this.showSideNavButton$.next(false);
          this.sideNavMode$.next('side');
        }
      });
  }

  public openSideNav(): void {
    this.sideNav.open();
  }
}
