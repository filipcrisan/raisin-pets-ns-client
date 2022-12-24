import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {environment} from "~/environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthService {
  apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  login(token: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/login?token=Bearer%20${token}`, null);
  }

  logout(): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/logout`, null);
  }
}
