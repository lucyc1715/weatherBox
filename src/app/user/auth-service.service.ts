import { AuthData } from './../shared/interfaces/user';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../shared/interfaces/user';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;

  // Observable
  authChange = new Subject<boolean>();
  private isAuthed: boolean = false;

  constructor(private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar) {
    this.user$ = this.afAuth.authState;
  }

  register(authData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.pwd)
      .then(result => {
        console.log('register result---', result);
        this.authSuccess();
      })
      .catch(error => {
        console.log('register result---', error);
      })
  }

  login(authData: AuthData) {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.pwd)
      .then(result => {
        console.log('login result---',result);
        this.authSuccess();
      })
      .catch(error => {
        console.log('login result---',error);
      })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.snackBar.open(`You've Signed Out`, 'OK', {
        duration: 5000
      });
      this.router.navigate(['/weather']);
      this.isAuthed = false;
    });
  }

  isAuth() {
    return this.isAuthed;
  }

  private authSuccess() {
    this.isAuthed = true;
    this.router.navigate(['/user/cities']);
  }

}
