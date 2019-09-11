import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public user: User;
  private subscriptions: Subscription = new Subscription();
  constructor(private loginSvc: LoginService) {
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
          console.log('login response from server', result);
        }, console.warn)
      );
    } else {
      alert('enter user name and password');
    }
  }

}
