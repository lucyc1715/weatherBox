import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  @ViewChild('s', { static: false })
  signInForm!: NgForm;

  @ViewChild('f', { static: false })
  registerForm!: NgForm;

  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  // Login
  onLogIn() {
    console.log('sign in!', this.signInForm.form.value);
    const email = this.signInForm.form.value.email;
    const pwd = this.signInForm.form.value.pwd;
    this.authService.login({ email: email, pwd: pwd });
  }

  // Register
  onSubmit() {
    console.log('submit!', this.registerForm.form.value);
    const email = this.registerForm.form.value.email;
    const pwd = this.registerForm.form.value.pwd;
    this.authService.register({ email: email, pwd: pwd });
  }

  // Google Login
  googleLogin() {
    console.log('Google Sign in!');
    this.authService.googleLogin();
  }

  // Gugest Login
  anonymLogin() {
    console.log('Anonymously Sign in!');
    this.authService.anonymLogin();
  }
}
