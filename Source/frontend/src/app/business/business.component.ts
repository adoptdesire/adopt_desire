import { Component } from '@angular/core';
import { SideNavHeaderComponent } from './side-nav-header/side-nav-header.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { WorksComponent } from './works/works.component';
import { StatesComponent } from './states/states.component';
import { ContactComponent } from './contact/contact.component';
import { LoaderComponent } from './loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ad-business',
  standalone: true,
  imports: [
    CommonModule,
    SideNavHeaderComponent,
    HomeBannerComponent,
    AboutComponent,
    ServicesComponent,
    WorksComponent,
    StatesComponent,
    ContactComponent,
    LoaderComponent,
  ],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss',
})
export class BusinessComponent {
  public isFeaturedWorks: boolean = false;
  public isStates: boolean = false;
}
