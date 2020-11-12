import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  get emailInvalid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get nameInvalid() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  get passwordInvalid() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signIn() {
    if (this.form.invalid) {
      return Object.values(this.form.controls)
        .forEach(control => {
          control.markAsTouched();
        });
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Por favor espere...'
    });

    Swal.showLoading();

    this.authService
      .signIn(this.form.value)
      .subscribe((resp) => {
        Swal.close();
        console.log(resp);
        this.router.navigateByUrl('/login')
      }, (err) => {
        Swal.close();
        console.log(err);
        Swal.fire({
          title: 'Error al autenticar',
          icon: 'error',
          text: err.error.error.message
        });
      });
  }

}
