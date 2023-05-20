import { Component, HostBinding, OnInit } from '@angular/core';
import { appRoutes } from './core/constants/app-routes.constant';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class')
  public theme = 'light-theme';

  public appRoutes = appRoutes;
  public sideNavOpen: boolean = false;
  public darkMode$ = new BehaviorSubject<boolean>(false);

  public ngOnInit(): void {
    const theme = localStorage.getItem('theme');

    if (!!theme) {
      if (theme === 'dark-theme') {
        this.darkMode$.next(true);
      } else if (theme === 'light-theme') {
        this.darkMode$.next(false);
      }
    }

    console.log(this.darkMode$.value);

    this.darkMode$.subscribe((darkMode) => {
      if (darkMode) {
        this.theme = 'dark-theme';
      } else {
        this.theme = 'light-theme';
      }
      localStorage.setItem('theme', this.theme);
    });
  }

  public handleDarkModeChange(event: MatSlideToggleChange): void {
    this.darkMode$.next(event.checked);
  }
}
