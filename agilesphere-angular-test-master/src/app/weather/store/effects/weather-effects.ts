import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import * as weatherActions from '../actions/weather-actions';
import { Forecast } from '../../models/forecast';
import { WeatherService } from '../../weather.service';

@Injectable()
export class WeatherEffects {

  constructor(private actions$: Actions, private weatherService: WeatherService) {}

  @Effect() searchCityForecast: Observable<Action> = this.actions$
    .ofType(weatherActions.SEARCH_CITY_FORECAST)
    .startWith(new weatherActions.SearchCityForecast('London'))
    .map((action: weatherActions.SearchCityForecast) => action.payload)
    .switchMap((city) =>
      this.weatherService.searchWeatherForCity(city)
        .map((forecast: Forecast) => new weatherActions.SearchCityForecastSuccess(forecast))
    );
}
