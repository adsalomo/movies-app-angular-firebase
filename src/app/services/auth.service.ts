import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(user: any) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${environment.urlApiFirebase}signInWithPassword?key=${environment.keyAuthFirebase}`,
      authData
    );
  }

  signIn(user: any) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${environment.urlApiFirebase}signUp?key=${environment.keyAuthFirebase}`,
      authData
    );
  }
}
