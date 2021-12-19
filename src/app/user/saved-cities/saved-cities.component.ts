import { Weather } from 'src/app/shared/interfaces/weather';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from './../../shared/firebase.service';
import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/shared/interfaces/city';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-saved-cities',
  templateUrl: './saved-cities.component.html',
  styleUrls: ['./saved-cities.component.scss']
})
export class SavedCitiesComponent implements OnInit {

  cities: any[] | undefined;
  city: any = {};
  panelOpenState: boolean = false;
  updateForm: boolean = true;
  // saveForm: boolean = true;

  // keep update userId
  userId: any = '';

  constructor(private firebaseService: FirebaseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if(this.userId ) {
      this.getCities(this.userId );
    }
  }

  getCities(id: string) {
    this.firebaseService
        .getUserCities(id)
        .subscribe(
          cities => {
            this.cities = cities;
            console.log(this.cities);
          }
        )
  }

  saveCityUpdate(newCity: Weather) {
    console.log('newCity--', newCity);
    this.firebaseService
        .updateCity(this.userId, this.city.id, newCity);
    this.city = {};
  }

  deleteCity(city: City) {
    this.firebaseService
        .deleteCity(this.userId, city);
  }

  updateCity(city: any) {
    this.city.name = city.weather.name;
    this.city.desc = city.weather.desc;
    this.city.temp = city.weather.temp;
    this.city.id = city.id;
  }
}
