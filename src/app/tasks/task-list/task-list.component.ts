import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';

import { Task } from '../../core/interfaces/common.interface';
import { TaskService } from '../../shared/services/task.service';
import { ModalManageTaskComponent } from '../modal-manage-task/modal-manage-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Description', 'Status', 'Actions'];
  dataSource = new MatTableDataSource<Task>();
  taskList: Task[] = [];

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    try {
      const data = await this.taskService.get();

      Object.keys(data).forEach((key: string) => {
        const task: Task = {
          Key: key,
          Name: data[key].Name,
          Description: data[key].Description,
          Status: data[key].Status
        };

        this.taskList.push(task);
      });

      this.dataSource.data = this.taskList;
    } catch (error) {
      this.snackBar.open(error.message, 'Ok');
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openNewTaskDialog(): void {
    const config = {
      width: '500px',
      data: {
        caption: 'Create new Task',
        isNew: true,
        secondBtnName: 'Create',
        task: {
          Key: '',
          Name: '',
          Description: '',
          Status: 'No Completed'
        }
      }
    };

    const modal = this.dialog.open(ModalManageTaskComponent, config);

    modal.afterClosed().subscribe((task: Task) => {
      if (task) {
        this.taskList.push(task);
        this.dataSource.data = this.taskList;
      }
    });
  }

  openEditTaskDialog(taskToEdit: Task): void {
    const config = {
      width: '500px',
      data: {
        caption: 'Edit Task',
        isNew: false,
        secondBtnName: 'Save',
        task: {
          Key: taskToEdit.Key,
          Name: taskToEdit.Name,
          Description: taskToEdit.Description,
          Status: taskToEdit.Status
        }
      }
    };

    const modal = this.dialog.open(ModalManageTaskComponent, config);

    modal.afterClosed().subscribe((task: Task) => {
      if (task) {
        const index = this.taskList.findIndex(item => item.Key === taskToEdit.Key);

        this.taskList[index] = task;
        this.dataSource.data = this.taskList;
      }
    });
  }

  async removeTask(taskToDelete: Task): Promise<void> {
    try {
      await this.taskService.delete(taskToDelete);

      this.taskList = this.taskList.filter(item => item.Key !== taskToDelete.Key);
      this.dataSource.data = this.taskList;
    } catch (error) {
      this.snackBar.open(error.message, 'Ok');
    }
  }
}
