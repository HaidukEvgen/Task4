import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() blockEvent = new EventEmitter();
  @Output() unblockEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  constructor(private userService: UserService) {}

  onBlock() {
    this.blockEvent.emit();
  }

  onUnblock() {
    this.unblockEvent.emit();
  }

  onDelete() {
    this.deleteEvent.emit();
  }
}
