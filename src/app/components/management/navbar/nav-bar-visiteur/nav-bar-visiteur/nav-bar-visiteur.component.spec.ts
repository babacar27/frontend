import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarVisiteurComponent } from './nav-bar-visiteur.component';

describe('NavBarVisiteurComponent', () => {
  let component: NavBarVisiteurComponent;
  let fixture: ComponentFixture<NavBarVisiteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarVisiteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarVisiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
