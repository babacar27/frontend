import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProduitAdminComponent } from './liste-produit-admin.component';

describe('ListeProduitAdminComponent', () => {
  let component: ListeProduitAdminComponent;
  let fixture: ComponentFixture<ListeProduitAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeProduitAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeProduitAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
