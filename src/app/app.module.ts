import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { TaskService } from './shared/services/task.service';
import { HeaderComponent } from './core/header/header.component';
import { ModalManageTaskComponent } from './tasks/modal-manage-task/modal-manage-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    TaskListComponent,
    ModalManageTaskComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    HttpClientModule
  ],
  entryComponents: [ModalManageTaskComponent],
  providers: [AuthService, AuthGuardService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
