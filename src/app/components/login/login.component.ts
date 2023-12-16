import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserLoginModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const userLoginModel: UserLoginModel = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this.userService.login(userLoginModel).subscribe({
        next: (res) => {
          alert(res.message);
          this.router.navigate(['user-manager']);
          this.loginForm.reset();
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    } else {
      alert('Form is not valid');
    }
  }
}
