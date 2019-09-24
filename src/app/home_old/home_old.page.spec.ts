import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage_old } from './home_old.page';

describe('HomePage_old', () => {
  let component: HomePage_old;
  let fixture: ComponentFixture<HomePage_old>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage_old ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage_old);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
