import { Action } from '@ngrx/store';
import { Forecast } from '../../models/forecast'

//constants
export const SEARCH_CITY_FORECAST = 'SEARCH_CITY_FORECAST';
export const SEARCH_CITY_FORECAST_SUCCESS = 'SEARCH_CITY_FORECAST_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

export class SearchCityForecast implements Action{

    readonly type = SEARCH_CITY_FORECAST;

    constructor(public payload:string) {}
}

export class SearchCityForecastSuccess implements Action
{
    readonly type = SEARCH_CITY_FORECAST_SUCCESS;

    constructor(public payload: Forecast){}
}

export class SearchFailure implements Action{

     readonly type = SEARCH_FAILURE;

     constructor(public payload:{error:any}){}
}

export type AllActions = 
|SearchCityForecast
|SearchCityForecastSuccess
|SearchFailure;
