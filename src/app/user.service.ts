import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './User';
import { LoginResponse } from './LoginResponse';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = 'http://localhost:3000/api/v1/login';  // URL to web api

  constructor(
    private http: HttpClient) { }


  login(user: User): Observable<LoginResponse> {
    return this.http.post(this.loginUrl,user).pipe(map((res: any) => res['data']),
    catchError(err => {
      console.log('caught mapping error and rethrowing', err);
      return throwError(err);
  }));
  }

}
