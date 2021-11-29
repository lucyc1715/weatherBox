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

  // Observable
  authChange = new Subject<boolean>();
  private isAuthed: boolean = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private snackBar: MatSnackBar) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthed = true;
        this.authChange.next(true);
        this.router.navigate(['/user/cities']);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/weather']);
        this.isAuthed = false;
      }
    });
  }

  register(authData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.pwd)
      .then(result => {
        console.log('register result---', result);
        // this.authSuccess();
      })
      .catch(error => {
        console.log('register result---', error);
      })
  }

  googleLogin() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        console.log('google login result---',result);
        // this.authSuccess();
      })
      .catch(error => {
        console.log('google login result---',error);
      });
  }

  anonymLogin() {
    this.afAuth.signInAnonymously()
    .then((user) => {
      console.log('Anonymously login result---',user);

      // this.authSuccess();
    })
    .catch(error =>{
      console.log('Anonymously login result---',error);
    })
  }

  login(authData: AuthData) {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.pwd)
      .then(result => {
        console.log('email login result---',result);
        // this.authSuccess();
      })
      .catch(error => {
        console.log('email login result---',error);
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

  // private authSuccess() {
  //   this.isAuthed = true;
  //   this.router.navigate(['/user/cities']);
  // }

}
