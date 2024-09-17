import {Component} from '@angular/core';

import {ComponentOrFeatureComponent} from '../component-or-feature/component-or-feature.component';

@Component({
  selector: 'app-components-and-features-section',
  standalone: true,
  imports: [ComponentOrFeatureComponent],
  templateUrl: './components-and-features-section.component.html',
  styleUrl: './components-and-features-section.component.scss',
})
export class ComponentsAndFeaturesSectionComponent {}
