import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { User } from '../../core/interfaces/common.interface';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  async signUp(user: User): Promise<any> {
    try {
      firebase.auth().createUserWithEmailAndPassword(user.Email, user.Password).then(userLogedIn => {
        if (userLogedIn.additionalUserInfo.isNewUser) {
          this.router.navigate(['login']);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async signIn(user: User) {
    try {
      firebase.auth().signInWithEmailAndPassword(user.Email, user.Password).then( userLogedIn => {
        if (userLogedIn) {
          this.router.navigate(['/tasks-list']);

          firebase.auth().currentUser.getIdToken().then( token => this.token = token);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async logOut() {
    try {
      await firebase.auth().signOut();
      this.token = null;
    } catch (e) {
      console.log(e);
    }
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then( token => this.token = token);

    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
