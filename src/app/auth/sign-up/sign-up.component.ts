import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
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

  async onSignUp(): Promise<void> {
    await this.authService.signUp(this.form.value);
  }
}
