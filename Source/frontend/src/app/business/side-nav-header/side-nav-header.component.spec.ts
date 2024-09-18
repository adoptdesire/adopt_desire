import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavHeaderComponent } from './side-nav-header.component';

describe('SideNavHeaderComponent', () => {
  let component: SideNavHeaderComponent;
  let fixture: ComponentFixture<SideNavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
