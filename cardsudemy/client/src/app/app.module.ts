import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HomeComponent} from './pages/home/home.component';
import {DetailsComponent} from './pages/details/details.component';
import {StationsComponent} from './pages/stations/stations.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherCardComponent} from './ui/weather-card/weather-card.component';
import {StationCardComponent} from './ui/station-card/station-card.component';
import {AddCardComponent} from './ui/add-card/add-card.component';
import {AddComponent} from './pages/add/add.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ErrorComponent} from './ui/error/error.component';
import {environment} from '../environments/environment';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ChartsModule } from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    StationsComponent,
    WeatherCardComponent,
    StationCardComponent,
    AddCardComponent,
    AddComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NguiAutoCompleteModule,
    AutocompleteLibModule,
    FormsModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
