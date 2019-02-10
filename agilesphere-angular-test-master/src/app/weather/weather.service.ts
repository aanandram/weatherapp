import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Forecast} from './models/forecast';

@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  apiID = '010721642521f31b0fbc8c3831d45951';
 
  constructor(private http: HttpClient) { }

  searchWeatherForCity(city?: string): Observable<Forecast> {
    const params: HttpParams = new HttpParams({fromObject: { 'q': `${city}`, 'units': 'metric', 'mode': 'json', 'APPID': this.apiID}});
    const options = {
      headers: new HttpHeaders(),
      params: params
    };
    return this.http.get<Forecast>(this.url, options);
  }

}
