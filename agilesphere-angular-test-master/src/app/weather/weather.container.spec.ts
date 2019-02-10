import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { WeatherContainer } from './weather.container';
import * as fromRoot from '../weather/store/reducers/index';
import { Store, StoreModule } from '@ngrx/store';
import { WeatherEffects } from '../weather/store/effects/weather-effects';
import { Observable } from 'rxjs/Observable';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';
import * as weatherActions from '../weather/store/actions/weather-actions';
import { Forecast } from '../weather/models/forecast';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
    let store: Store<fromRoot.WeatherState>
    const output = {
      forecast: []
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot(output),
        EffectsModule.forRoot([WeatherEffects])
      ],
      declarations: [
        WeatherContainer,
        TestHostComponent,
        SearchComponent,
        ResultsComponent,        
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('When we dispatch store', () => {
    beforeEach(() => {
      store = fixture.debugElement.injector.get(Store);
      store.dispatch({ type: weatherActions.SEARCH_CITY_FORECAST, payload: 'London'});
      fixture.detectChanges();
    });
  
    it('forecast list to be defined', async(() => {
      expect(component.forecastList$).toBeDefined();
    }));

  });

  // PLEASE IMPLEMENT MORE TESTS
});

@Component({
  template: ``
})
class TestHostComponent implements OnInit {
  forecastList$: Observable<Forecast[]>;

  constructor(private store: Store<fromRoot.WeatherState>) {}

  ngOnInit() {
    this.forecastList$ = this.store.select(fromRoot.getAllForecast);
  }

  search(city?: string) {
    this.store.dispatch(new weatherActions.SearchCityForecast(city));
  }
}
