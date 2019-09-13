import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public user: User;
  private subscriptions: Subscription = new Subscription();
  constructor(private loginSvc: LoginService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  validateLogin() {
    if (this.user.username && this.user.password) {
      this.subscriptions.add(
        this.loginSvc.validateLogin(this.user).subscribe(result => {
          console.log('result is ', result);
          if (result['status'] === 200) {
            this.router.navigate(['/home']);
          } else {
            alert('Wrong username password');
          }

        }, console.warn)
      );
    } else {
      alert('enter user name and password');
    }
  }

}
