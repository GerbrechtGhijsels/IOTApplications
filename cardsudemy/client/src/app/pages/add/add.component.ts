import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherService} from '../../services/weather/weather.service';
import {AuthService} from '../../services/auth/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {

  temp: number;
  city = 'Rome';
  state: string;
  capitals = [];
  selectedCity;
  cardCity;
  showNote = false;
  followedCM = false;
  sub1;


  constructor(public http: HttpClient, public weather: WeatherService, public fb: AuthService) {
  }

  ngOnInit() {
    // getting the city placeID
    this.weather.getWeather(this.city).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
    });

    this.http.get('https://restcountries.eu/rest/v2/all').pipe((first())).subscribe((countries: Array<any>) => {
      countries.forEach((country: any) => {
        if (country.capital.length) {
          this.capitals.push(country.capital);
        }
      });
      this.capitals.sort();
    });


  }

  selectCity(city) {
    if (this.capitals.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else if (city.leading > 0) {
      this.showNote = true;
    }
  }

  addCityOfTheMonth() {

  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
