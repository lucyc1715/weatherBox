import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  hide: boolean = true;
  constructor(private router: Router,
    public afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private authService: AuthService) { }

  ngOnInit(): void {

  }

  success(content: any) {
    this.snackBar.open(`Welcom ${content.displayName}`, 'OK', {
      duration: 5000
    });
    this.router.navigate(['/weather']);
  }

  onSubmit(form: NgForm) {
    console.log('submit!')
    // this.authService.register({
    //   email: form.value.email,
    //   password: form.value.password
    // });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
