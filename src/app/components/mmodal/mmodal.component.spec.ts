import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmodalComponent } from './mmodal.component';

describe('MmodalComponent', () => {
  let component: MmodalComponent;
  let fixture: ComponentFixture<MmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
