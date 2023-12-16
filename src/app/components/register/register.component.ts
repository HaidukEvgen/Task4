import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserRegisterModel } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userRegisterModel: UserRegisterModel = {
        name: this.registerForm.value.name!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
      };

      this.userService.register(userRegisterModel).subscribe({
        next: (res) => {
          alert(res.message);
          this.router.navigate(['login']);
          this.registerForm.reset();
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
