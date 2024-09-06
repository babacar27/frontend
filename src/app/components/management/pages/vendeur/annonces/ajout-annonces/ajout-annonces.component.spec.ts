import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAnnoncesComponent } from './ajout-annonces.component';

describe('AjoutAnnoncesComponent', () => {
  let component: AjoutAnnoncesComponent;
  let fixture: ComponentFixture<AjoutAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutAnnoncesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
