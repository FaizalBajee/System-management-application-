import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterTypePage } from './master-type.page';

describe('MasterTypePage', () => {
  let component: MasterTypePage;
  let fixture: ComponentFixture<MasterTypePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
