import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { defer } from 'rxjs/observable/defer';
import { generateMockForecast } from '../../models/forecast';
import { Store } from '@ngrx/store';
import { SearchComponent } from './search.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { WeatherEffects } from '../../store/effects/weather-effects';
import Spy = jasmine.Spy;
import { WeatherService } from '../../weather.service';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchButton: HTMLElement;
  let getForecastSpy: jasmine.Spy;

  beforeEach(async(() => {
    const forecastMock = generateMockForecast();
    const service = jasmine.createSpyObj('WeatherService', ['searchWeatherForCity']);
    getForecastSpy = service.search.and.returnValue( asyncData(forecastMock) );

    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        FormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([WeatherEffects])
      ],
      providers: [
        {provide: WeatherService, useValue: service},
        Store
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On click search - with valid city', () => {
    beforeEach(() => {
      searchButton = fixture.nativeElement.querySelector('.btn-search');
      fixture.detectChanges();
    });

    it('shoud call get search service', () => {
      component.city = 'London';
      searchButton.click();
      fixture.detectChanges();
      expect(getForecastSpy.calls.any()).toBe(true, 'search called');
    });
  });
});
