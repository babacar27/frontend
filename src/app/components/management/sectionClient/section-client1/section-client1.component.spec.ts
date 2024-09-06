import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionClient1Component } from './section-client1.component';

describe('SectionClient1Component', () => {
  let component: SectionClient1Component;
  let fixture: ComponentFixture<SectionClient1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionClient1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionClient1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
