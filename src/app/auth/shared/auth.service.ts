import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';



const jwt = new JwtHelperService();

class DecodedTkn {
  exp: number = 0;
  username: string = '';
}

@Injectable()
export class AuthService {
    private decodedTkn;
  constructor(private http: HttpClient) {
    this.decodedTkn = JSON.parse(localStorage.getItem('rwm_meta')) || new DecodedTkn();
  }
  
  private saveToken(token: string): string {
    this.decodedTkn = jwt.decodeToken(token);

    localStorage.setItem('rwm_auth', token);
    localStorage.setItem('rwm_meta', JSON.stringify(this.decodedTkn));

    return token;
  }

  private getExp() {
    return moment.unix(this.decodedTkn.exp);
  }
  public register(userData:any): Observable<any> {
      return this.http.post('/api/v1/users/register', userData);
  }
  
  public login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/auth', userData).pipe(map(
      (token: string) => this.saveToken(token)));
  }

  public logout() {
    localStorage.removeItem('rwm_auth');
    localStorage.removeItem('rwm_meta');

    this.decodedTkn = new DecodedTkn();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExp());
  }

  public getAuthToken(): string {
    return localStorage.getItem('rwm_auth');
  }

  public getUsername(): string {
    return this.decodedTkn.username;
  }

}