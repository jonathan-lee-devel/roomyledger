import {NgOptimizedImage} from '@angular/common';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  currentYear: string = '';

  ngOnInit() {
    this.currentYear = String(new Date().getFullYear());
  }
}
