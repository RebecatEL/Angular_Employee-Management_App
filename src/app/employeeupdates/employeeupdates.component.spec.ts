import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeupdatesComponent } from './employeeupdates.component';

describe('EmployeeupdatesComponent', () => {
  let component: EmployeeupdatesComponent;
  let fixture: ComponentFixture<EmployeeupdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeupdatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeupdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
