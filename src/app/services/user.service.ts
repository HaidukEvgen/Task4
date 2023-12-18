import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserLoginModel, UserRegisterModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:5286/users';

  constructor(private http: HttpClient) {}

  login(userLoginModel: UserLoginModel) {
    return this.http.post<any>(`${this.apiUrl}/login`, userLoginModel);
  }

  register(userRegisterModel: UserRegisterModel) {
    return this.http.post<any>(`${this.apiUrl}/register`, userRegisterModel);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  blockUsers(userIds: number[]) {
    return this.http.patch<any>(`${this.apiUrl}/block`, userIds);
  }
  
  unblockUsers(userIds: number[]) {
    return this.http.patch<any>(`${this.apiUrl}/unblock`, userIds);
  }

  deleteUsers(userIds: number[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: userIds
    };
    return this.http.delete<any>(`${this.apiUrl}`, options);
  }
}
