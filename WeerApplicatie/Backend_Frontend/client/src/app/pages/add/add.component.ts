import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherService} from '../../services/weather/weather.service';
import {AuthService} from '../../services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';
import {first} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {MockService} from '../../services/mock/mock.service';

import  * as L from 'leaflet';
import 'mapbox-gl-leaflet';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from '../../ui/map/map';
import {Observable} from "rxjs";

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
    modelStation = {
        "stn": 225,
        "lon": 4.555,
        "lat": 52.463,
        "alt": 4.4,
        "name": "IJMUIDEN",
        "id": "6016ce5b4ada9ea92de0515c"
    };
    selectedStation;
    cardCity;
    cardStation;
    showCityNote = false;
    showStationNote = false;
    sub1;

    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/outdoors-v9';
    initialState = {
        lng: 52,
        lat: 23,
        zoom: 4
    };

    // data
    source: any;
    stationCollection: any;

    public fields: Object = { value: 'name' };

    public arrayOfKeyValues2: any[] =
        [
            {id: 11, key: 1, name: 'Key One'},
            {id: 12, key: 2, name: 'Key Two'},
            {id: 13, key: 3, name: 'Key Three'},
            {id: 14, key: 4, name: 'Key Four'}
        ];

    @ViewChild('map')
    private mapContainer: ElementRef<HTMLElement>;

    constructor(public http: HttpClient, public weather: WeatherService, public auth: AuthService, public api: ApiService, public mock: MockService) {
        mapboxgl.accessToken = environment.config.mapbox.accessToken;
    }

    autocompleListFormatter = (data: any) => {
        let html = `<span>${data.stn}:  ${data.name} </span>`;
        return html;
    }

    ngOnInit() {
        this.initializeMap()

        // getting the city placeID
        this.weather.getWeather(this.city).subscribe((payload: any) => {
            this.state = payload.weather[0].main;
            this.temp = Math.ceil(Number(payload.main.temp));
        });

        this.request('GET','https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?fq=type:woonplaats&fl=woonplaatsnaam&q=*&rows=3000').subscribe((response: any) => {
            this.cityList = [];
            response.response.docs.forEach((city: any) => {
                this.cityList.push(city.woonplaatsnaam);
            });
            this.cityList.sort();
        });

        /**
         this.request('POST', 'https://countriesnow.space/api/v0.1/countries/cities', {
      country: 'Netherlands'
    }).subscribe((response: any) => {
      response.data.forEach((city: any) => {
        this.cityList.push(city);
      });
      this.cityList.sort();
    });
         **/

        this.stationList = this.mock.stationData;
        if(true) {
            this.api.request('GET', '/api/stations').subscribe((response: any) => {
                this.setStations(response);
            });
        }
    }

    private initializeMap() {

        this.buildMap()

    }

    buildMap() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            center: [4.6435597, 52.3837058],
            zoom: 13,
            attributionControl: false
        });
        /// Add map controls
        //this.map.addControl(new mapboxgl.NavigationControl());



        /// Add realtime firebase data on map load
        this.map.on('load', (event) => {
            /// register source
            this.map.addSource('stations', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            });

            /// get source
            this.source = this.map.getSource('stations');

            //this.setStations(this.mock.stationData);
            this.setMarkers(this.stationList);
            if(true) {
                this.api.request('GET', '/api/stations').subscribe((response: any) => {
                    this.setStations(response);
                    this.setMarkers(this.stationList);
                });
            }
            this.map.addLayer({
                id: 'stations',
                source: 'stations',
                type: 'symbol',
                'layout': {
                    'icon-image': 'rocket-15'
                }
            });


        });


    }

    setStations(stations: any[])
    {
        this.stationList = stations;
        this.stationList.sort();
    }

    setMarkers(stationList: any[])
    {
        let markers: GeoJson[] = [];
        stationList.forEach((station) => {
            const geomarker = new GeoJson([station.lon, station.lat], {message: station.name})
            markers.push(geomarker);
        });
        console.log(markers);
        this.stationCollection = new FeatureCollection(markers);
        this.source.setData(this.stationCollection);
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
            this.showCityNote = false;
        } else if (city.leading > 0) {
            this.showCityNote = true;
        }
    }

    selectStation(stn) {
        console.log(stn);
        let station = this.stationList.find(x => x.stn == stn);

        this.flyTo(station);

        if (this.stationList.includes(station)) {
            this.cardStation = station;
            this.showStationNote = false;
        } else if (station.leading > 0) {
            this.showStationNote = true;
        }
    }

    flyTo(station) {
        console.log(station);
        this.map.flyTo({
            center: [station.lon, station.lat]
        })
    }

    ngOnDestroy() {
    }

}
