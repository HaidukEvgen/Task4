import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

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
