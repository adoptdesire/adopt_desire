import { Component, Input } from '@angular/core';

@Component({
  selector: 'ad-side-nav-header',
  standalone: true,
  imports: [],
  templateUrl: './side-nav-header.component.html',
  styleUrl: './side-nav-header.component.scss',
})
export class SideNavHeaderComponent {
  @Input() isFeaturedWorks: boolean = false;
}
