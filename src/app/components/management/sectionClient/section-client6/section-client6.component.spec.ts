import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionClient6Component } from './section-client6.component';

describe('SectionClient6Component', () => {
  let component: SectionClient6Component;
  let fixture: ComponentFixture<SectionClient6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionClient6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionClient6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
