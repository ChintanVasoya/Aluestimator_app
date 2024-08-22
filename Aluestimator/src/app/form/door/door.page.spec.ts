import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoorPage } from './door.page';

describe('DoorPage', () => {
  let component: DoorPage;
  let fixture: ComponentFixture<DoorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
