import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProduitAdminComponent } from './ajout-produit-admin.component';

describe('AjoutProduitAdminComponent', () => {
  let component: AjoutProduitAdminComponent;
  let fixture: ComponentFixture<AjoutProduitAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutProduitAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutProduitAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
