import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionClient7Component } from './section-client7.component';

describe('SectionClient7Component', () => {
  let component: SectionClient7Component;
  let fixture: ComponentFixture<SectionClient7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionClient7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionClient7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
