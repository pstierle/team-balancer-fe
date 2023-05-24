import { LayoutService } from './core/services/layout.service';
import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { appRoutes } from './core/constants/app-routes.constant';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  public sideNav!: MatSidenav;

  @HostBinding('class')
  public theme = 'light-theme';

  public appRoutes = appRoutes;
  public sideNavOpen: boolean = false;
  public darkMode$ = new BehaviorSubject<boolean>(false);
  public isSmallWindow$ = new BehaviorSubject<boolean>(false);
  public showSideNavButton$ = this.layoutService.showSideNavButton$;
  public sideNavMode$ = this.layoutService.sideNavMode$;

  constructor(private layoutService: LayoutService) {}

  public ngOnInit(): void {
    const theme = localStorage.getItem('theme');

    if (!!theme) {
      if (theme === 'dark-theme') {
        this.darkMode$.next(true);
      } else if (theme === 'light-theme') {
        this.darkMode$.next(false);
      }
    }

    this.darkMode$.subscribe((darkMode) => {
      if (darkMode) {
        this.theme = 'dark-theme';
      } else {
        this.theme = 'light-theme';
      }
      localStorage.setItem('theme', this.theme);
    });
  }

  public ngAfterViewInit(): void {
    this.layoutService.init(this.sideNav);
  }

  public handleDarkModeChange(event: MatSlideToggleChange): void {
    this.darkMode$.next(event.checked);
  }

  public showMenu(): void {
    this.sideNav.open();
  }
}
