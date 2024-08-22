import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowPage } from './window.page';

describe('WindowPage', () => {
  let component: WindowPage;
  let fixture: ComponentFixture<WindowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
