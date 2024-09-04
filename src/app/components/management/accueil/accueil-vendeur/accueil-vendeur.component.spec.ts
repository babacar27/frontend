import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilVendeurComponent } from './accueil-vendeur.component';

describe('AccueilVendeurComponent', () => {
  let component: AccueilVendeurComponent;
  let fixture: ComponentFixture<AccueilVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilVendeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
