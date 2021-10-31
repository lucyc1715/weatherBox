import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Weather } from '../shared/interfaces/weather';
import { WeatherResp } from '../shared/interfaces/weatherResp';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  // private FORECAST = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
  private KEY = 'f4bdffe09ff92ba65cc8d67921f7302b';
  private IMP = '&units=imperial';

  constructor(private http: HttpClient) { }

  /**
   * search by city name
   * @param cityName
   * @returns
   */
  searchData(cityName: string): Observable<any> {
    return this
      .http
      .get<WeatherResp>(`${this.URL}${cityName}&appid=${this.KEY}${this.IMP}`)
      .pipe(
        map(data => this.transformData(data)),
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private transformData(data: WeatherResp): Weather {
    return {
      city: data.name,
      country: data.sys.country,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      desc: data.weather[0].description,
      temp: data.main.temp,
      lat: data.coord.lat,
      lon: data.coord.lon
    }
  }

  private handleError(res: HttpErrorResponse) {
    console.error(res);
    return throwError(res.error || 'Server Error')
  }
}
