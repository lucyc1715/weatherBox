import { Injectable } from '@angular/core';
import { Weather } from '../shared/interfaces/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  weather: Weather = {
    city: '',
    country: '',
    image: '',
    desc: '',
    temp: 0,
    lat: 0 as number,
    lon: 0 as number,
  }
  constructor() { }
}
