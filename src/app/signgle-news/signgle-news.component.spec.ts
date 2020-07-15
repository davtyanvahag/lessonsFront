import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigngleNewsComponent } from './signgle-news.component';

describe('SigngleNewsComponent', () => {
  let component: SigngleNewsComponent;
  let fixture: ComponentFixture<SigngleNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigngleNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigngleNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
