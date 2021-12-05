import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from './../../shared/firebase.service';
import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/shared/interfaces/city';

@Component({
  selector: 'app-saved-cities',
  templateUrl: './saved-cities.component.html',
  styleUrls: ['./saved-cities.component.scss']
})
export class SavedCitiesComponent implements OnInit {

  cities: City[] | undefined;
  city: any = {};
  panelOpenState: boolean = false;
  updateForm: boolean = false;
  saveForm: boolean = true;

  // keep update userId
  userId = this.route.snapshot.paramMap.get('id');

  constructor(private firebaseService: FirebaseService,
              private route: ActivatedRoute) { }

  // TODO add uid with weather
  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if(param) {
      console.log(param);
      const id = param;
    }
  }

}
