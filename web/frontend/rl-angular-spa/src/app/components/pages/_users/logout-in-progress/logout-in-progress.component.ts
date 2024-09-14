import {Component} from '@angular/core';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@Component({
  selector: 'app-logout-in-progress',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './logout-in-progress.component.html',
  styleUrl: './logout-in-progress.component.scss',
})
export class LogoutInProgressComponent {}
