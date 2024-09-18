import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BusinessComponent } from './business/business.component';
@Component({
  selector: 'ad-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BusinessComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'adopt-desire';
}
