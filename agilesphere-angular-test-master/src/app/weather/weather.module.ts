import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherContainer } from './weather.container';
import { WeatherService } from './weather.service';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import * as fromWeather from '../weather/store/reducers/index';
import { WeatherEffects } from '../weather/store/effects/weather-effects';

 import { StoreModule } from '@ngrx/store';
 import { EffectsModule } from '@ngrx/effects';
 import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
     StoreModule.forFeature('weather', fromWeather.reducers),
     EffectsModule.forFeature([WeatherEffects])
  ],
  declarations: [
    SearchComponent,
    ResultsComponent,
    WeatherContainer
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule { }
