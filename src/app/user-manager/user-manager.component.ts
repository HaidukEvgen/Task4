import { Component, Input } from '@angular/core';
import { AppTableComponent } from './table/table.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { User } from '../app.component';
import { UserService } from '../user.service';

export interface TableUser extends User {
  checked: boolean;
}

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [AppTableComponent, UserActionsComponent],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css',
})
export class UserManagerComponent {
  mappedUsers: TableUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.mappedUsers = data.map((user) => ({
        checked: Math.random() > 0.5,
        ...user,
      }));
    });
  }

  setAll(checked: boolean) {
    this.mappedUsers.forEach((user) => (user.checked = checked));
  }

  deleteSelected() {
    const checkedUserIds = this.mappedUsers
      .filter((user) => !user.checked)
      .map((user) => user.id);
    this.mappedUsers = this.mappedUsers.filter((user) => !user.checked);
    this.userService.deleteUsers(checkedUserIds);
  }

  blockSelected() {
    const checkedUserIds = this.mappedUsers
      .filter((user) => !user.checked)
      .map((user) => user.id);
    this.mappedUsers
      .filter((user) => user.checked)
      .forEach((user) => {
        user.status = 'Blocked';
      });
    this.userService.blockUsers(checkedUserIds);
  }

  unblockSelected() {
    const checkedUserIds = this.mappedUsers
      .filter((user) => !user.checked)
      .map((user) => user.id);
    this.mappedUsers
      .filter((user) => user.checked)
      .forEach((user) => {
        user.status = 'Active';
      });
    this.userService.unblockUsers(checkedUserIds);
  }

  setOne(props: { id: number; event: boolean }) {
    const targetUser = this.mappedUsers.find((user) => user.id == props.id);
    if (targetUser) {
      targetUser.checked = props.event;
    }
  }
}
