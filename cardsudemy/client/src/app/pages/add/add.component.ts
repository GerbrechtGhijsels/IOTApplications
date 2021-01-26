import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherService} from '../../services/weather/weather.service';
import {AuthService} from '../../services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {

  temp: number;
  city = 'Haarlem';
  state: string;
  cityList = [];
  stationList = [];
  selectedCity;
  selectedStation;
  cardCity;
  cardStation;
  showNote = false;
  sub1;


  constructor(public http: HttpClient, public weather: WeatherService, public auth: AuthService, public api: ApiService) {
  }

  ngOnInit() {
    // getting the city placeID
    this.weather.getWeather(this.city).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
    });


    this.request('POST', 'https://countriesnow.space/api/v0.1/countries/cities', {
      country: 'Netherlands'
    }).subscribe((response: any) => {
      response.data.forEach((city: any) => {
        this.cityList.push(city);
      });
      this.cityList.sort();
    });

    this.api.request('GET', '/api/stations').subscribe((response: any) => {
      response.forEach((station) => {
        this.stationList.push(station.stn);
      });
      this.stationList.sort();
    });
  }

  request(method: string, route: string, data?: any) {

    return this.http.request(method, route, {
      body: data,
      responseType: 'json',
      observe: 'body'
    });
  }

  selectCity(city) {
    if (this.cityList.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else if (city.leading > 0) {
      this.showNote = true;
    }
  }

  selectStation(station) {
    if (this.stationList.includes(station)) {
      this.cardStation = station;
      this.showNote = false;
    } else if (station.leading > 0) {
      this.showNote = true;
    }
  }

  ngOnDestroy() {
  }

}
