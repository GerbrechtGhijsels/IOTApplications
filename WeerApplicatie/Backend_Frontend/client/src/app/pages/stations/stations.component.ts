import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {UiService} from '../../services/ui/ui.service';
import { ApiService } from '../../services/api/api.service';
import { MeasurementsService } from '../../services/measurements/measurements.service';
import { concatMap } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { HttpClientModule } from '@angular/common/http';
import {MockService} from '../../services/mock/mock.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})

export class StationsComponent implements OnInit, OnDestroy {

  darkMode: boolean;
  stn: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;
  today: string;
  daysForecast: Object;
  cityIllustrationPath: string;
  sub1: Subscription;
  sub2: Subscription;
  errorMessage: string;

  public lineChartLegend = false;
  public lineChartType = "line";

  public tempData: ChartDataSets[] = [{ data: [] }];
  public tempChartLabels: Label[] = [];
  public tempChartOptions: any = {
    animation: {
      animateScale: true,
      animateRotate: true
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        },
        gridLines: {
          display: false,
        }
      }],
      yAxes: [{
        ticks: {
          max: 40,
          min: -5,
          stepSize:1
        },
        stacked:true,
        gridLines: {
          display: false
        }
      }]
    },
    responsive: true,
    maintainAspectRatio: false
  };


  public windData: ChartDataSets[] = [{ data: [] }];
  public windChartLabels: Label[] = [];
  public windChartOptions: any = {
    animation: {
      animateScale: true,
      animateRotate: true
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        },
        gridLines: {
          display: false,
        }
      }],
      yAxes: [{
        ticks: {
          max: 20,
          min: 0,
          stepSize:1
        },
        stacked:true,
        gridLines: {
          display: false
        }
      }]
    },
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartColors: Color[] = [
    {
      borderColor: "#fd0087",
      backgroundColor: "#0C162A"
    }
  ];


  constructor(public activeRouter: ActivatedRoute, public weather: WeatherService, public ui: UiService, public api: ApiService, public measurementService: MeasurementsService, public mock: MockService) {

  }


  ngOnInit() {

    this.sub1 = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });



    this.sub2 = this.activeRouter.paramMap.pipe(concatMap((route: any) => {
          this.stn = route.params.stn;
          this.cityIllustrationPath = '../../assets/cities/default.svg';

          if(false){
            return this.mock.measurementData;
          }
          return this.api.request('GET', '/api/measurements/all/test?stn=' + this.stn + '&limit=100');
        })
    ).subscribe((response: any) => {
      let measurement = this.measurementService.converter(response[0]);
      this.temp = Math.ceil(measurement.tg);

      this.hum = measurement.ug;
      this.wind = measurement.fg;
      this.tempData = [{ data: [] }];
      this.tempChartLabels = [];
      this.windData = [{ data: [] }];
      this.windChartLabels = [];
      response.forEach((measurement: any) => {
        let measurementUI = this.measurementService.converter(measurement);
        if(measurementUI.tg != null)
        {
          this.tempChartLabels.push(measurementUI.yyyymmdd);
          this.tempData[0].data.push(measurementUI.tg);
        }
        if(measurementUI.fg != null)
        {
          this.windChartLabels.push(measurementUI.yyyymmdd);
          this.windData[0].data.push(measurementUI.fg);
        }
      });
    }, (error) => {
      this.errorMessage = error.error.message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2500);
    });

  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
