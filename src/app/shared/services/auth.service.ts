import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import * as firebase from 'firebase';

import { User } from '../../core/interfaces/common.interface';

@Injectable()
export class AuthService {
  token: string;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar) { }

  signUp(user: User) {
    firebase.auth().createUserWithEmailAndPassword(user.Email, user.Password).then(userLogedIn => {
      if (userLogedIn.additionalUserInfo.isNewUser) {
        this.router.navigate(['login']);
      }
    }).catch(error => {
      this.snackBar.open(error.message, 'Ok');
    });
  }

  signIn(user: User) {
    firebase.auth().signInWithEmailAndPassword(user.Email, user.Password).then( userLogedIn => {
      if (userLogedIn) {
        this.router.navigate(['/tasks-list']);

        firebase.auth().currentUser.getIdToken().then( token => this.token = token);
      }
    }).catch(error => {
      this.snackBar.open(error.message, 'Ok');
    });
  }

  async logOut() {
    try {
      await firebase.auth().signOut();

      this.token = null;
    } catch (error) {
      throw (error as HttpErrorResponse).message;
    }
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(token => this.token = token);

    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
