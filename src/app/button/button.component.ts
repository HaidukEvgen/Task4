import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class AppButtonComponent {
  @Input() buttonText: string = '';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  
  handleButtonClick() {
    this.buttonClick.emit();
  }
}
