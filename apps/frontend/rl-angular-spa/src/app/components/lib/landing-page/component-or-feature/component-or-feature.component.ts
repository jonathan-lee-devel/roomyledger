import {NgClass} from '@angular/common';
import {Component, input} from '@angular/core';

@Component({
  selector: 'app-component-or-feature',
  standalone: true,
  imports: [NgClass],
  templateUrl: './component-or-feature.component.html',
  styleUrl: './component-or-feature.component.scss',
})
export class ComponentOrFeatureComponent {
  iconClass = input.required<string>();
  headerText = input.required<string>();
  subHeaderText = input.required<string>();
}
