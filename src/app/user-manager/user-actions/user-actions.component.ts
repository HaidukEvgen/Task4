import { Component, Input } from '@angular/core';
import { AppButtonComponent } from '../../button/button.component';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-actions',
  standalone: true,
  imports: [AppButtonComponent],
  templateUrl: './user-actions.component.html',
  styleUrl: './user-actions.component.css',
})
export class UserActionsComponent {
  @Input() userIds: number[] = [];

  constructor(private userService: UserService) {}

  onBlockButtonClick() {
    console.log(this.userIds);
    this.userService.blockUser(this.userIds);
  }
}
