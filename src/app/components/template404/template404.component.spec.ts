import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template404Component } from './template404.component';

describe('Template404Component', () => {
  let component: Template404Component;
  let fixture: ComponentFixture<Template404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Template404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Template404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
