import { Component, ViewChild } from '@angular/core';
import { AppTableComponent } from './table/table.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { UserService } from '../../services/user.service';
import { TableUser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [AppTableComponent, UserActionsComponent],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css',
})
export class UserManagerComponent {
  @ViewChild(AppTableComponent, { static: false })
  tableComponent!: AppTableComponent;
  mappedUsers: TableUser[] = [];
  username: string = '';
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.storageService.getUsername().subscribe((val) => {
      let usernameFromToken = this.authService.getUsername();
      this.username = val || usernameFromToken;
    });
  }

  blockSelected() {
    const checkedUserIds = this.mappedUsers
      .filter((user) => user.checked)
      .map((user) => user.id);
    if ((checkedUserIds.length == 0)) return;
    this.userService
      .blockUsers(checkedUserIds)
      .subscribe(() => this.getUsers());
    this.tableComponent.allChecked = false;
  }

  unblockSelected() {
    const checkedUserIds = this.mappedUsers
      .filter((user) => user.checked)
      .map((user) => user.id);
    if ((checkedUserIds.length == 0)) return;
    this.userService
      .unblockUsers(checkedUserIds)
      .subscribe(() => this.getUsers());
    this.tableComponent.allChecked = false;
  }

  deleteSelected() {
    const checkedUserIds = this.mappedUsers
      .filter((user) => user.checked)
      .map((user) => user.id);
    if ((checkedUserIds.length == 0)) return;
    this.userService
      .deleteUsers(checkedUserIds)
      .subscribe(() => this.getUsers());
    this.tableComponent.allChecked = false;
  }

  logout() {
    this.authService.logout();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.mappedUsers = data.map((user) => ({
        checked: false,
        ...user,
      }));
    });
  }

  setAll(checked: boolean) {
    this.mappedUsers.forEach((user) => (user.checked = checked));
    this.tableComponent.allChecked = checked;
  }

  setOne(props: { id: number; event: boolean }) {
    const targetUser = this.mappedUsers.find((user) => user.id == props.id);
    if (targetUser) {
      targetUser.checked = props.event;
    }
  }
}
