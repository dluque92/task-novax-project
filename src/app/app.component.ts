import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDp_-BA3L5a-v5RHTeXcOQ_2GniDnNcdeQ',
      authDomain: 'task-novax-project.firebaseapp.com'
    });
  }
}
