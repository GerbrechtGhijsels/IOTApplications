import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {first, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  constructor(public fb: AuthService, public router: Router) {
  }

  ngOnInit() {
  }

  login(e) {

  }

}
