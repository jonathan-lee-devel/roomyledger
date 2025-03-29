import {Component} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-update-or-maintenance-in-progress-message',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './update-or-maintenance-in-progress-message.component.html',
  styleUrl: './update-or-maintenance-in-progress-message.component.scss',
})
export class UpdateOrMaintenanceInProgressMessageComponent {}
