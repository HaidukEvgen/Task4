import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { UserManagerComponent } from './user-manager/user-manager.component';

export interface User {
  id: number;
  name: string;
  email: string;
  lastLogin: string;
  status: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}
}
