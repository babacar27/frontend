import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionClient2Component } from './section-client2.component';

describe('SectionClient2Component', () => {
  let component: SectionClient2Component;
  let fixture: ComponentFixture<SectionClient2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionClient2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionClient2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
