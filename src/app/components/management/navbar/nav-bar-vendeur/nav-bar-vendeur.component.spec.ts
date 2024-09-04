import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarVendeurComponent } from './nav-bar-vendeur.component';

describe('NavBarVendeurComponent', () => {
  let component: NavBarVendeurComponent;
  let fixture: ComponentFixture<NavBarVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarVendeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
