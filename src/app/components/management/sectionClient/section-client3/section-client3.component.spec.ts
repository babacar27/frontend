import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionClient3Component } from './section-client3.component';

describe('SectionClient3Component', () => {
  let component: SectionClient3Component;
  let fixture: ComponentFixture<SectionClient3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionClient3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionClient3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
