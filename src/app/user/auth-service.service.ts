import { User } from 'src/app/shared/interfaces/user';
import { AuthData } from './../shared/interfaces/user';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Observable
  authChange = new Subject<boolean>();

  user$!: Observable<User | null>;

  private isAuthed: boolean = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private snackBar: MatSnackBar) {
              this.user$ = this.afAuth.authState;
  }

  initAuthListener() {
    this.user$ = this.afAuth.authState;
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
      .then(res => {
        console.log('Email register result---', res);
        this.addToDb({
          uid: res.user?.uid,
          email: res.user?.email,
          photoURL: res.user?.photoURL,
          displayName: res.user?.displayName,
          providerId: res.user?.providerId,
        }, 'Email');
      })
      .catch(error => {
        console.log('Email register result---', error);
      })
  }

  googleLogin() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        console.log('Google Sign In result---',res);
        if(res.additionalUserInfo?.isNewUser) {
          this.addToDb({
            uid: res.user?.uid,
            email: res.user?.email,
            photoURL: res.user?.photoURL,
            displayName: res.user?.displayName,
            providerId: res.credential?.providerId,
          }, 'Google');
        }
      })
      .catch(error => {
        console.log('Google Sign In result---',error);
      });
  }

  anonymLogin() {
    this.afAuth.signInAnonymously()
    .then((res) => {
      console.log('Anonymously login result---',res);
    })
    .catch(error =>{
      console.log('Anonymously login result---',error);
    })
  }

  login(authData: AuthData) {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.pwd)
      .then(result => {
        console.log('Email login result---',result);
      })
      .catch(error => {
        console.log('Email login result---',error);
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

  addToDb(user: User, registeType: string) {
    this.db.collection('users').add(user).then(res => {
      console.log(`${registeType} user add db success`);
    })
  }
}
