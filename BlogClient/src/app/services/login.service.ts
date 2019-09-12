import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private headers = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  validateLogin(user: User) {
    return this.http.post('/api/user/login', {
      username: user.username,
      password: user.password
    }, {
      headers: this.headers
    }).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(response: Response) {
    return response.json();
  }

  private handleError(error: Response | any) {
    let resMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      resMsg = body['message'];
      console.log(body);
      console.log(resMsg);
    } else {
      resMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(resMsg);
  }
}
