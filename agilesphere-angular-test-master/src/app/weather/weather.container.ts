import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Forecast} from '../weather/models/forecast';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../weather/store/reducers/index';
import * as weatherActions from '../weather/store/actions/weather-actions';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (onSearch)="citySearch($event)"></app-search>
  <app-results [forecast]="forecastList$ | async"></app-results>  `
  ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherContainer {

  constructor(private store: Store<fromRoot.WeatherState>) {}
  forecastList$: Observable<Forecast[]>;
  
  ngOnInit() {
    this.forecastList$ = this.store.select(fromRoot.getAllForecast);
  }

  citySearch(city?: string) {     
      this.store.dispatch(new weatherActions.SearchCityForecast(city));     
  }
}
