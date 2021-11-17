import { WeatherDataService } from './../weather-data.service';
import { WeatherService } from './../weather.service';
import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/shared/interfaces/weather';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {

  query: string = '';
  errMsg: any = {};
  email = new FormControl('', [Validators.required, Validators.email]);
  hide: boolean = true;

  constructor(private weatherService: WeatherService,
    private weatherDataService: WeatherDataService) { }

  ngOnInit(): void {
  }

  set weather(data: Weather) {
    this.weatherDataService.weather = data;
  }

  search(val: string) {
    this.weatherService
      .searchData(val)
      .subscribe(
        weather => this.weather = weather,
        error => this.errMsg = <any>error,
        () => this.query = ''
      );
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
