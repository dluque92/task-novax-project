import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../core/interfaces/common.interface';

@Component({
  selector: 'app-modal-manage-task',
  templateUrl: './modal-manage-task.component.html',
  styleUrls: ['./modal-manage-task.component.scss']
})
export class ModalManageTaskComponent implements OnInit {
  task: Task;
  optionStatus = ['Completed', 'No Completed'];
  form: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public dialogRef: MatDialogRef<ModalManageTaskComponent>
  ) { }

  ngOnInit() {
    this.task = this.modalData.task;

    this.form = this.formBuilder.group({
      Name: [this.task.Name, Validators.required],
      Description: [this.task.Description, Validators.required],
      Status: [this.task.Status, Validators.required]
    });
  }

  async submit(): Promise<void> {
    try {
      this.task.Name = this.form.value.Name;
      this.task.Description = this.form.value.Description;
      this.task.Status = this.form.value.Status;

      if (this.modalData.isNew) {
        const name: any = await this.taskService.post(this.form.value);
        this.task.Key = name.name;
      } else {
        await this.taskService.put(this.task);
      }
      this.dialogRef.close(this.task);
    } catch (error) {
      console.error(error);
    }
  }
}
