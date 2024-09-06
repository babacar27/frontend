import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionClient4Component } from './section-client4.component';

describe('SectionClient4Component', () => {
  let component: SectionClient4Component;
  let fixture: ComponentFixture<SectionClient4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionClient4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionClient4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
