import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartitionPage } from './partition.page';

describe('PartitionPage', () => {
  let component: PartitionPage;
  let fixture: ComponentFixture<PartitionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
