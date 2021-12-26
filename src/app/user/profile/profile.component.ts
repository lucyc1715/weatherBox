import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({});

  userId: any = '';

  profile: any = {};

  qrcode: string = '';

  constructor(private firebaseService: FirebaseService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.profileForm = new FormGroup({
      'name': new FormControl(this.profile['displayName'], Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'link': new FormControl(''),
    });
    if(this.userId ) {
      this.getUserInfo(this.userId);
    }
  }

  getUserInfo(id: string) {
    this.firebaseService.getUserInfo(this.userId).valueChanges()
      .subscribe( res => {
        this.profile = res;
        this.profileForm.get('name')?.patchValue(this.profile.displayName);
        this.profileForm.get('email')?.patchValue(this.profile.email);
        this.profileForm.get('link')?.patchValue(this.profile.link);
        this.qrcode = this.profileForm.get('link')?.value;
      });
  }

  save() {
    const editUserInfo = {
      uid: this.userId,
      displayName: this.profileForm.get('name')?.value,
      email: this.profileForm.get('email')?.value,
      link: this.profileForm.get('link')?.value
    }
    this.firebaseService.updateUserInfo(this.userId, editUserInfo)
      .then( (res) => {
        this.snackBar.open(`Success! Profile Saved`, 'OK', {
          duration: 5000
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  genQRCode() {
    this.qrcode = this.profileForm.get('link')?.value;
  }
}
