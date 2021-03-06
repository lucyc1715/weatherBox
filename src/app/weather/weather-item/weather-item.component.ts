import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from './../../shared/firebase.service';
import { AuthService } from 'src/app/user/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/shared/interfaces/weather';
import { WeatherDataService } from '../weather-data.service';
import { User } from 'src/app/shared/interfaces/user';
import { City } from 'src/app/shared/interfaces/city';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {

  lat: number = 0;
  lon: number = 0;
  get weather(): Weather {

    if (this.weatherDataService.weather.lat !== undefined) {
      this.lat = this.weatherDataService.weather.lat;
    }

    if (this.weatherDataService.weather.lon !== undefined) {
      this.lon = this.weatherDataService.weather.lon;
    }

    return this.weatherDataService.weather;
  }

  userId: string | undefined;
  constructor(private weatherDataService: WeatherDataService,
              private authService: AuthService,
              private firebaseService: FirebaseService,
              private snackBar: MatSnackBar) {
                this.authService.user$.subscribe(user => {
                  const isLogin = this.authService.isAuth();
                  if(isLogin) {
                    this.userId = user?.uid;
                  }
                });
              }

  ngOnInit(): void {
  }

  addCity(weather: Weather){
    const city: City = {
      name: this.weather.city,
      country: this.weather.country,
      desc: this.weather.desc,
      temp: this.weather.temp,
      lat: this.weather.lat,
      lon: this.weather.lon
    };
    this.firebaseService
        .addCity(this.userId, city)
        .then( (res) => {
          this.snackBar.open(`Success! City Saved`, 'OK', {
            duration: 5000
          });
        })
        .catch((err) => {
          console.log(err);
        })
  }
}
