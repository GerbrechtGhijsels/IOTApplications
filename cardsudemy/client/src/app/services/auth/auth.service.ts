import {Injectable} from '@angular/core';
import {first, switchMap} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {HttpClient} from '@angular/common/http';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseURL = environment.config.baseURL;
  private readonly appToken = environment.config.apiToken;

  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;
  private email: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private server: ApiService) {
    console.log('Auth Service');
    const userData = localStorage.getItem('user');
    if (userData) {
      console.log('Logged in from memory');
      const user = JSON.parse(userData);
      this.token = user.token;
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
    }
  }

  getEmail(){
    return this.server.email;
  }

  isAuth() {
    console.log("auth " + this.loggedIn.getValue())
    return this.loggedIn.getValue();
  }

  signin(email, pass) {
    console.log('Submitting');
    if (email !== '' && pass !== '' ) {
      return this.server.request('POST', '/api/users/signin', {
        email: email,
        password: pass
      }).subscribe((response: any) => {
        const values = Object.keys(response).map(it => response[it])
        console.log('Response ' + values);

        if (response.id !== undefined) {
          console.log('Response ' + response.email);
          this.token = response.id;
          this.email = response.email;
          this.server.setLoggedIn(true, this.token, this.email);
          this.loggedIn.next(true);
          const userData = {
            email: this.email,
            token: this.token,
          };
          localStorage.setItem('user', JSON.stringify(userData));
          this.router.navigateByUrl('');
        }
      });
    }
  }

  signup(email, pass) {
    console.log('Submitting');
    if (email !== '' && pass !== '' ) {
      this.server.request('GET', '/api/users/currentuser').subscribe((response: any) => {

      });

      return this.server.request('POST', '/api/users/signup', {
        email: email,
        password: pass
      }).subscribe((response: any) => {
        //this.router.navigate(['/login']);
        this.router.navigateByUrl('');
      });
    }
  }


  logout() {
    this.server.request('POST', '/api/users/signout', {

    }).subscribe((response: any) => {

    });

    this.server.setLoggedIn(false);
    delete this.token;

    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getCities() {
    return this.server.request('GET', '/api/users/user/cities').subscribe((response: any) => {

    });
  }

  getStations() {
    return this.server.request('GET', '/api/users/user/stations').subscribe((response: any) => {

    });
  }

  addCity(name: string) {
    return this.server.request('PUT', '/api/users/user/stations', {
      city: name
    });
  }

  addStation(name: string) {
    return this.server.request('PUT', '/api/users/user/stations', {
      station: name
    });
  }
}



