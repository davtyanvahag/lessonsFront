import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigngleTestComponent } from './signgle-test.component';

describe('SigngleTestComponent', () => {
  let component: SigngleTestComponent;
  let fixture: ComponentFixture<SigngleTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigngleTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigngleTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
