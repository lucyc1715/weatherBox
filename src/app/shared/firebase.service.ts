import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { City } from './interfaces/city';
import { Weather } from './interfaces/weather';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userCollection: AngularFirestoreCollection = this.afs.collection('users');

  cityCollection!: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) { }

  getUserCities(userId: string): Observable<any[]> {
    this.cityCollection
     = this.afs.collection(`users/${userId}/cities`, (ref) => ref.orderBy('time', 'desc'));

     // reTrack observable by using snapshot
     return this.cityCollection.snapshotChanges()
            .pipe(
              map( actions => actions.map( a => {
                const data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                return { ...data};
              }))
            )
  }

  addCity(userId: any, weather: any) {
    console.log('firestore uid--', userId);
    const city = {
      weather,
      time: new Date()
    }
    return this.userCollection.doc(userId).collection('cities').add(city);
  }

  getCity(userId: string, cityId: City) {
    return this.afs.doc(`users/${userId}/cities/${cityId}`);
  }

  deleteCity(userId: any, city: City) {
    return this.getCity(userId, city).delete();
  }

  updateCity(userId: any, city: City, weather?: Weather) {
    console.log(`firebaseService: updateCity - city: ${city} weather:  ${JSON.stringify(weather)}`);
    const newCity = {
      weather,
      time: new Date(),
    };
    return this.getCity(userId, city).set(newCity);
  }
}
