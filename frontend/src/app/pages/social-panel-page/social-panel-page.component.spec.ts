/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SocialPanelPageComponent } from './social-panel-page.component';

describe('SocialPanelPageComponent', () => {
  let component: SocialPanelPageComponent;
  let fixture: ComponentFixture<SocialPanelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialPanelPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPanelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
