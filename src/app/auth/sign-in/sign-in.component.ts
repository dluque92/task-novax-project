import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      Email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      Password: new FormControl('', [
        Validators.required
      ])
    });
  }

  async onSignIn(): Promise<void> {
    await this.authService.signIn(this.form.value);
  }
}
