import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesCommandeComponent } from './mes-commande.component';

describe('MesCommandeComponent', () => {
  let component: MesCommandeComponent;
  let fixture: ComponentFixture<MesCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
