import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableUser } from '../user-manager.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class AppTableComponent {
  @Input() users: TableUser[] = [];
  allChecked: boolean = false;
  displayedColumns: string[] = [
    'checked',
    'name',
    'email',
    'lastLogin',
    'status',
  ];
}
