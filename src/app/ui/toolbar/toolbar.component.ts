import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/user/auth-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{

  isLogin: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  uid!: string | undefined;
  constructor(private breakpointObserver: BreakpointObserver,
              public userAuth: AuthService,
              private route: ActivatedRoute) {
                this.userAuth.authChange.subscribe( state => {
                  this.isLogin = state;
                  console.log('--LoginState--', this.isLogin);
                });
              }

  ngOnInit(): void {
    this.userAuth.user$.subscribe( user => {
      this.uid = user?.uid;
    })
  }
}
