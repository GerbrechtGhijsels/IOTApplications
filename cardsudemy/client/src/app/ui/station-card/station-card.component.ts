import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {UiService} from '../../services/ui/ui.service';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';
import {MockService} from "../../services/mock/mock.service";
import {MeasurementsService} from "../../services/measurements/measurements.service";

@Component({
  selector: 'app-station-card',
  templateUrl: './station-card.component.html',
  styleUrls: ['./station-card.component.css']
})


/**
 # YYYYMMDD = Datum (YYYY=jaar MM=maand DD=dag);
 # DDVEC    = Vectorgemiddelde windrichting in graden (360=noord, 90=oost, 180=zuid, 270=west, 0=windstil/variabel). Zie http://www.knmi.nl/kennis-en-datacentrum/achtergrond/klimatologische-brochures-en-boeken;
 # FHVEC    = Vectorgemiddelde windsnelheid (in 0.1 m/s). Zie http://www.knmi.nl/kennis-en-datacentrum/achtergrond/klimatologische-brochures-en-boeken;
 # FG       = Etmaalgemiddelde windsnelheid (in 0.1 m/s);
 # FHX      = Hoogste uurgemiddelde windsnelheid (in 0.1 m/s);
 # FHXH     = Uurvak waarin FHX is gemeten;
 # FHN      = Laagste uurgemiddelde windsnelheid (in 0.1 m/s);
 # FHNH     = Uurvak waarin FHN is gemeten;
 # FXX      = Hoogste windstoot (in 0.1 m/s);
 # FXXH     = Uurvak waarin FXX is gemeten;
 # TG       = Etmaalgemiddelde temperatuur (in 0.1 graden Celsius);
 # TN       = Minimum temperatuur (in 0.1 graden Celsius);
 # TNH      = Uurvak waarin TN is gemeten;
 # TX       = Maximum temperatuur (in 0.1 graden Celsius);
 # TXH      = Uurvak waarin TX is gemeten;
 # T10N     = Minimum temperatuur op 10 cm hoogte (in 0.1 graden Celsius);
 # T10NH    = 6-uurs tijdvak waarin T10N is gemeten; 6=0-6 UT, 12=6-12 UT, 18=12-18 UT, 24=18-24 UT
 # SQ       = Zonneschijnduur (in 0.1 uur) berekend uit de globale straling (-1 voor <0.05 uur);
 # SP       = Percentage van de langst mogelijke zonneschijnduur;
 # Q        = Globale straling (in J/cm2);
 # DR       = Duur van de neerslag (in 0.1 uur);
 # RH       = Etmaalsom van de neerslag (in 0.1 mm) (-1 voor <0.05 mm);
 # RHX      = Hoogste uursom van de neerslag (in 0.1 mm) (-1 voor <0.05 mm);
 # RHXH     = Uurvak waarin RHX is gemeten;
 # PG       = Etmaalgemiddelde luchtdruk herleid tot zeeniveau (in 0.1 hPa) berekend uit 24 uurwaarden;
 # PX       = Hoogste uurwaarde van de luchtdruk herleid tot zeeniveau (in 0.1 hPa);
 # PXH      = Uurvak waarin PX is gemeten;
 # PN       = Laagste uurwaarde van de luchtdruk herleid tot zeeniveau (in 0.1 hPa);
 # PNH      = Uurvak waarin PN is gemeten;
 # VVN      = Minimum opgetreden zicht; 0: <100 m, 1:100-200 m, 2:200-300 m,..., 49:4900-5000 m, 50:5-6 km, 56:6-7 km, 57:7-8 km,..., 79:29-30 km, 80:30-35 km, 81:35-40 km,..., 89: >70 km)
 # VVNH     = Uurvak waarin VVN is gemeten;
 # VVX      = Maximum opgetreden zicht; 0: <100 m, 1:100-200 m, 2:200-300 m,..., 49:4900-5000 m, 50:5-6 km, 56:6-7 km, 57:7-8 km,..., 79:29-30 km, 80:30-35 km, 81:35-40 km,..., 89: >70 km)
 # VVXH     = Uurvak waarin VVX is gemeten;
 # NG       = Etmaalgemiddelde bewolking (bedekkingsgraad van de bovenlucht in achtsten, 9=bovenlucht onzichtbaar);
 # UG       = Etmaalgemiddelde relatieve vochtigheid (in procenten);
 # UX       = Maximale relatieve vochtigheid (in procenten);
 # UXH      = Uurvak waarin UX is gemeten;
 # UN       = Minimale relatieve vochtigheid (in procenten);
 # UNH      = Uurvak waarin UN is gemeten;
 # EV24     = Referentiegewasverdamping (Makkink) (in 0.1 mm);

 */


export class StationCardComponent implements OnInit, OnDestroy {


  @Input() set station (stn: string) {
    this.stationNumber = stn;
    console.log("weather card " + stn);

    //let measurementUI = this.measurementService.converter(this.mock.measurementData[0]);
    //this.state = response.weather[0].main;
    //this.temp = Math.ceil(measurementUI.tg);
    if (true) {

      this.api.request('GET', '/api/measurements/all/test?stn=' + stn + '&limit=1').subscribe((response: any) => {
            console.log(response[0]);
            let measurementUI = this.measurementService.converter(response[0]);
            //this.state = response.weather[0].main;
            this.temp = Math.ceil(measurementUI.tg);
          },
          (error) => {
            this.errorMessage = error.error.message;
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          });
    }

  }

  @Input() addMode;
  @Output() stationStored = new EventEmitter();
  darkMode: boolean;
  sub1: Subscription;
  state: string = 'Sunny';
  temp: number;
  maxTemp: number;
  minTemp: number;
  errorMessage: string;
  stationNumber;
  stationAdded = false;

  constructor(public weather: WeatherService,
              public router: Router,
              public ui: UiService,
              public auth: AuthService,
              public api: ApiService,
              public mock: MockService,
              public measurementService: MeasurementsService) {
  }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }


  openDetailsStation() {
    if (!this.addMode) {
      console.log(this.stationNumber);
      this.router.navigateByUrl('/stations/' + this.stationNumber);
    }
  }

  addStation() {
    this.auth.addStation(this.stationNumber).subscribe(() => {
      this.stationAdded = true;
      this.stationStored.emit();
      setTimeout(() => this.stationAdded = false, 2000);
    });
  }

}
