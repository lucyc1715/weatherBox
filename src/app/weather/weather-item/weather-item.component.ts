import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/shared/interfaces/weather';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {

  lat: number = 0;
  lon: number = 0;
  constructor(private weatherDataService: WeatherDataService) { }


  get weather(): Weather {

    if (this.weatherDataService.weather.lat !== undefined) {
      this.lat = this.weatherDataService.weather.lat;
    }

    if (this.weatherDataService.weather.lon !== undefined) {
      this.lon = this.weatherDataService.weather.lon;
    }

    return this.weatherDataService.weather;
  }

  ngOnInit(): void {
  }

}
