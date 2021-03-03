import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioPageComponent } from './radioPage.component';

describe('LoginComponent', () => {
  let component: RadioPageComponent;
  let fixture: ComponentFixture<RadioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});