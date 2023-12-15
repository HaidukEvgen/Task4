import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserLoginModel, UserRegisterModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:5286';

  constructor(private http: HttpClient) {}

  login(userLoginModel: UserLoginModel) {
    return this.http.post<any>(`${this.apiUrl}/users/login`, userLoginModel);
  }

  register(userRegisterModel: UserRegisterModel) {
    return this.http.post<any>(`${this.apiUrl}/users/register`, userRegisterModel);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  deleteUsers(userIds: number[]): Observable<User[]> {
    return this.http.delete<User[]>(`${this.apiUrl}/users`, { body: userIds });
  }

  blockUsers(userIds: number[]): Observable<User[]> {
    return this.http.patch<User[]>(`${this.apiUrl}/users/block`, {
      body: userIds,
    });
  }

  unblockUsers(userIds: number[]) {
    return this.http.patch<User[]>(`${this.apiUrl}/users/unblock`, {
      body: userIds,
    });
  }
}
