import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalManageTaskComponent } from './modal-manage-task.component';

describe('ModalManageTaskComponent', () => {
  let component: ModalManageTaskComponent;
  let fixture: ComponentFixture<ModalManageTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalManageTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalManageTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
