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


  public weatherData = [
    {
      "stn": "240",
      "yyyymmdd": "20200108",
      "ddvec": "",
      "fhvec": "",
      "fg": "63",
      "fhx": "",
      "fhxh": "",
      "fnh": "",
      "fhnh": "",
      "fxx": "",
      "fxxh": "",
      "tg": "104",
      "tn": "84",
      "tnh": "1",
      "tx": "122",
      "txh": "12",
      "t10n": "81",
      "t10nh": "6",
      "sq": "",
      "sp": "",
      "q": "",
      "dr": "",
      "rh": "",
      "rhx": "",
      "rhxh": "",
      "pg": "10207",
      "px": "",
      "pxh": "",
      "pn": "",
      "pnh": "",
      "vvn": "",
      "vvnh": "",
      "vvx": "",
      "vvxh": "",
      "ng": "8",
      "ug": "94",
      "ux": "",
      "uxh": "",
      "un": "",
      "unh": "",
      "ev24": "",
      "measurementid": "117547",
      "id": "602a8b126a7a90cd957cd0af"
    },
    {
      "stn": "240",
      "yyyymmdd": "20200107",
      "ddvec": "201",
      "fhvec": "59",
      "fg": "63",
      "fhx": "100",
      "fhxh": "24",
      "fnh": "40",
      "fhnh": "3",
      "fxx": "150",
      "fxxh": "24",
      "tg": "68",
      "tn": "29",
      "tnh": "8",
      "tx": "84",
      "txh": "24",
      "t10n": "17",
      "t10nh": "12",
      "sq": "31",
      "sp": "39",
      "q": "271",
      "dr": "3",
      "rh": "1",
      "rhx": "1",
      "rhxh": "18",
      "pg": "10230",
      "px": "10255",
      "pxh": "10",
      "pn": "10196",
      "pnh": "24",
      "vvn": "36",
      "vvnh": "22",
      "vvx": "65",
      "vvxh": "21",
      "ng": "5",
      "ug": "92",
      "ux": "97",
      "uxh": "8",
      "un": "85",
      "unh": "21",
      "ev24": "4",
      "measurementid": "117546",
      "id": "602a8b126a7a90cd957cd0fa"
    },
    {
      "stn": "240",
      "yyyymmdd": "20200106",
      "ddvec": "197",
      "fhvec": "54",
      "fg": "57",
      "fhx": "80",
      "fhxh": "11",
      "fnh": "30",
      "fhnh": "20",
      "fxx": "120",
      "fxxh": "11",
      "tg": "60",
      "tn": "33",
      "tnh": "19",
      "tx": "72",
      "txh": "12",
      "t10n": "22",
      "t10nh": "24",
      "sq": "32",
      "sp": "41",
      "q": "246",
      "dr": "10",
      "rh": "7",
      "rhx": "6",
      "rhxh": "23",
      "pg": "10233",
      "px": "10291",
      "pxh": "1",
      "pn": "10185",
      "pnh": "18",
      "vvn": "50",
      "vvnh": "23",
      "vvx": "75",
      "vvxh": "10",
      "ng": "7",
      "ug": "85",
      "ux": "95",
      "uxh": "23",
      "un": "72",
      "unh": "12",
      "ev24": "3",
      "measurementid": "117545",
      "id": "602a8b126a7a90cd957cd132"
    },
    {
      "stn": "240",
      "yyyymmdd": "20200105",
      "ddvec": "214",
      "fhvec": "46",
      "fg": "47",
      "fhx": "60",
      "fhxh": "15",
      "fnh": "30",
      "fhnh": "1",
      "fxx": "100",
      "fxxh": "16",
      "tg": "70",
      "tn": "62",
      "tnh": "17",
      "tx": "78",
      "txh": "11",
      "t10n": "59",
      "t10nh": "18",
      "sq": "0",
      "sp": "0",
      "q": "77",
      "dr": "0",
      "rh": "-1",
      "rhx": "-1",
      "rhxh": "1",
      "pg": "10325",
      "px": "10339",
      "pxh": "3",
      "pn": "10299",
      "pnh": "24",
      "vvn": "58",
      "vvnh": "16",
      "vvx": "70",
      "vvxh": "11",
      "ng": "8",
      "ug": "90",
      "ux": "95",
      "uxh": "2",
      "un": "81",
      "unh": "14",
      "ev24": "1",
      "measurementid": "117544",
      "id": "602a8b126a7a90cd957cd156"
    },
    {
      "stn": "240",
      "yyyymmdd": "20200104",
      "ddvec": "279",
      "fhvec": "60",
      "fg": "62",
      "fhx": "90",
      "fhxh": "11",
      "fnh": "20",
      "fhnh": "22",
      "fxx": "130",
      "fxxh": "9",
      "tg": "73",
      "tn": "53",
      "tnh": "4",
      "tx": "84",
      "txh": "14",
      "t10n": "43",
      "t10nh": "6",
      "sq": "3",
      "sp": "4",
      "q": "121",
      "dr": "25",
      "rh": "8",
      "rhx": "4",
      "rhxh": "21",
      "pg": "10295",
      "px": "10334",
      "pxh": "24",
      "pn": "10273",
      "pnh": "2",
      "vvn": "31",
      "vvnh": "20",
      "vvx": "65",
      "vvxh": "8",
      "ng": "8",
      "ug": "88",
      "ux": "97",
      "uxh": "20",
      "un": "83",
      "unh": "10",
      "ev24": "2",
      "measurementid": "117543",
      "id": "602a8b126a7a90cd957cd182"
    },
    {
      "stn": "240",
      "yyyymmdd": "20200103",
      "ddvec": "249",
      "fhvec": "48",
      "fg": "69",
      "fhx": "100",
      "fhxh": "11",
      "fnh": "30",
      "fhnh": "19",
      "fxx": "180",
      "fxxh": "11",
      "tg": "76",
      "tn": "42",
      "tnh": "21",
      "tx": "105",
      "txh": "11",
      "t10n": "23",
      "t10nh": "24",
      "sq": "0",
      "sp": "0",
      "q": "84",
      "dr": "56",
      "rh": "26",
      "rhx": "6",
      "rhxh": "13",
      "pg": "10184",
      "px": "10273",
      "pxh": "23",
      "pn": "10130",
      "pnh": "11",
      "vvn": "27",
      "vvnh": "12",
      "vvx": "70",
      "vvxh": "7",
      "ng": "7",
      "ug": "88",
      "ux": "96",
      "uxh": "12",
      "un": "76",
      "unh": "17",
      "ev24": "1",
      "measurementid": "117542",
      "id": "602a8b126a7a90cd957cd1a1"
    },
    {
      "stn": "240",
      "yyyymmdd": "20200102",
      "ddvec": "186",
      "fhvec": "55",
      "fg": "56",
      "fhx": "80",
      "fhxh": "24",
      "fnh": "40",
      "fhnh": "2",
      "fxx": "110",
      "fxxh": "23",
      "tg": "42",
      "tn": "14",
      "tnh": "2",
      "tx": "79",
      "txh": "24",
      "t10n": "14",
      "t10nh": "6",
      "sq": "0",
      "sp": "0",
      "q": "66",
      "dr": "0",
      "rh": "0",
      "rhx": "0",
      "rhxh": "1",
      "pg": "10230",
      "px": "10283",
      "pxh": "1",
      "pn": "10168",
      "pnh": "24",
      "vvn": "5",
      "vvnh": "1",
      "vvx": "64",
      "vvxh": "23",
      "ng": "8",
      "ug": "95",
      "ux": "98",
      "uxh": "1",
      "un": "88",
      "unh": "23",
      "ev24": "1",
      "measurementid": "117541",
      "id": "602a8b126a7a90cd957cd1da"
    },
    {
      "stn": "240",
      "yyyymmdd": "20200101",
      "ddvec": "174",
      "fhvec": "33",
      "fg": "38",
      "fhx": "50",
      "fhxh": "22",
      "fnh": "20",
      "fhnh": "1",
      "fxx": "70",
      "fxxh": "2",
      "tg": "19",
      "tn": "0",
      "tnh": "10",
      "tx": "31",
      "txh": "1",
      "t10n": "2",
      "t10nh": "12",
      "sq": "0",
      "sp": "0",
      "q": "80",
      "dr": "0",
      "rh": "0",
      "rhx": "0",
      "rhxh": "1",
      "pg": "10315",
      "px": "10342",
      "pxh": "1",
      "pn": "10288",
      "pnh": "24",
      "vvn": "2",
      "vvnh": "2",
      "vvx": "46",
      "vvxh": "21",
      "ng": "8",
      "ug": "96",
      "ux": "98",
      "uxh": "1",
      "un": "91",
      "unh": "21",
      "ev24": "1",
      "measurementid": "117540",
      "id": "602a8b126a7a90cd957cd218"
    },
    {
      "stn": "240",
      "yyyymmdd": "20191231",
      "ddvec": "67",
      "fhvec": "11",
      "fg": "23",
      "fhx": "40",
      "fhxh": "23",
      "fnh": "10",
      "fhnh": "10",
      "fxx": "70",
      "fxxh": "24",
      "tg": "52",
      "tn": "1",
      "tnh": "19",
      "tx": "88",
      "txh": "13",
      "t10n": "-21",
      "t10nh": "24",
      "sq": "53",
      "sp": "68",
      "q": "351",
      "dr": "0",
      "rh": "0",
      "rhx": "0",
      "rhxh": "1",
      "pg": "10336",
      "px": "10359",
      "pxh": "19",
      "pn": "10285",
      "pnh": "1",
      "vvn": "0",
      "vvnh": "19",
      "vvx": "67",
      "vvxh": "14",
      "ng": "8",
      "ug": "92",
      "ux": "99",
      "uxh": "21",
      "un": "74",
      "unh": "13",
      "ev24": "4",
      "measurementid": "117539",
      "id": "602a8b126a7a90cd957cd22c"
    },
    {
      "stn": "240",
      "yyyymmdd": "20191230",
      "ddvec": "211",
      "fhvec": "44",
      "fg": "48",
      "fhx": "60",
      "fhxh": "11",
      "fnh": "20",
      "fhnh": "24",
      "fxx": "90",
      "fxxh": "12",
      "tg": "45",
      "tn": "13",
      "tnh": "2",
      "tx": "72",
      "txh": "13",
      "t10n": "1",
      "t10nh": "6",
      "sq": "55",
      "sp": "71",
      "q": "375",
      "dr": "0",
      "rh": "0",
      "rhx": "0",
      "rhxh": "1",
      "pg": "10285",
      "px": "10317",
      "pxh": "1",
      "pn": "10264",
      "pnh": "17",
      "vvn": "58",
      "vvnh": "21",
      "vvx": "80",
      "vvxh": "4",
      "ng": "3",
      "ug": "75",
      "ux": "96",
      "uxh": "23",
      "un": "63",
      "unh": "12",
      "ev24": "5",
      "measurementid": "117538",
      "id": "602a8b126a7a90cd957cd252"
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
      response = this.weatherData;
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
