import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionClient5Component } from './section-client5.component';

describe('SectionClient5Component', () => {
  let component: SectionClient5Component;
  let fixture: ComponentFixture<SectionClient5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionClient5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionClient5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
