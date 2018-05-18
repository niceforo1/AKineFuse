import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService22 {
  loginUrl: string = 'http://localhost:5000/api/login';

  constructor(private _http: HttpClient) {}

  login(user) {
    user.gethash = true;
    return this._http.post(this.loginUrl, user);
  }
}
