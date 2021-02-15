import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities;
  stations;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    this.cities = this.auth.getCities();
    this.stations = this.auth.getStations();
  }
}
