import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { defer } from 'rxjs/observable/defer';
import { WeatherService } from './weather.service';
import { generateMockForecast } from '../weather/models/forecast';
import { Forecast } from '../weather/models/forecast';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('WeatherService', () => {
  let httpMock: HttpTestingController;
  let weatherService: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        WeatherService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
        httpMock.verify();
  });

  it('instance should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));

  describe('On Forecast search', () => {
    let httpClientSpy: { get: jasmine.Spy };
    const expectedForecast: Forecast = generateMockForecast();

    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      weatherService = new WeatherService(<any>httpClientSpy);
    });

    it('should get one forecast', () =>{
      httpClientSpy.get.and.returnValue(asyncData(expectedForecast));
      weatherService.searchWeatherForCity('london').subscribe(
        data => expect(data).toEqual(expectedForecast, 'expected forecast'),
        fail
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });   
  });
});
