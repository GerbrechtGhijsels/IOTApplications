import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {environment} from "../../../environments/environment";
import {first, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';

  public loginInvalid: boolean;

  constructor(public auth: AuthService, public router: Router) {
  }

  ngOnInit() {
  }

  async login(e) {

    try {
      await this.auth.signin(e.target.email.value, e.target.password.value);
    } catch (err) {
      this.loginInvalid = true;
      this.errorMessage = err;
      setTimeout(() => this.errorMessage = '', 2000);
    }
  }

}
