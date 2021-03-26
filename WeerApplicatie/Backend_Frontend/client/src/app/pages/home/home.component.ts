import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {MockService} from '../../services/mock/mock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities;
  stations;

  constructor(public auth: AuthService, public mock: MockService) {
  }

  ngOnInit() {
    this.cities = this.auth.getCities();
    this.stations = this.auth.getStations();
    //this.auth.setLoggenIn();
    //this.cities = this.mock.cities.cities;
    //this.stations = this.mock.stations.stations;
  }
}
