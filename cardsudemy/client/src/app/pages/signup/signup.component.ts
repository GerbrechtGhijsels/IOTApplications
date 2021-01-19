import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage;

  constructor(public auth: AuthService, public router: Router) {
  }

  ngOnInit() {
  }

  signup(e) {

    try {
      console.log('signUp');
       this.auth.signup(e.target.email.value, e.target.password.value);
    } catch (err) {
      this.errorMessage = err;
      setTimeout(() => this.errorMessage = '', 2000);
    }
  }

}
