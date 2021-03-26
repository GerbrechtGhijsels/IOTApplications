import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from './services/ui/ui.service';
import {AuthService} from './services/auth/auth.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MockService} from "./services/mock/mock.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  showMenu = false;
  darkModeActive: boolean;

  userEmail = '';

  constructor(public ui: UiService, public auth: AuthService, public router: Router, public mock: MockService) {
  }

  loggedIn = this.auth.isAuth();
  sub1;

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });

    this.userEmail = this.auth.getEmail();
    //this.userEmail = this.mock.user.email;

  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  logout() {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
    this.auth.logout();
  }

}
