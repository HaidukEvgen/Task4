import { Component, Input } from '@angular/core';
import { AppTableComponent } from './table/table.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { User } from '../app.component';

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
  @Input() users: User[] = [];
  mappedUsers: TableUser[] = [];
  checkedUserIds: number[] = [];

  ngOnInit() {
    this.mappedUsers = this.users.map((user) => ({
      checked: Math.random() > 0.5,
      ...user,
    }));
  }

  setAll(checked: boolean) {
    this.mappedUsers.forEach((user) => (user.checked = checked));
  }

  deleteSelected() {
    this.mappedUsers = this.mappedUsers.filter(user => !user.checked)
  }

  setOne(props: {id: number, event: boolean}) {
    const targetUser = this.mappedUsers.find((user) => user.id == props.id);
    if (targetUser) {
      targetUser.checked = props.event;
    }
  }
}
