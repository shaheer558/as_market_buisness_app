import { Component, signal } from '@angular/core';
import { email, form, min, required, minLength } from '@angular/forms/signals';
import {Router} from "@angular/router"

interface LoginFormModel{
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css', '../../output.scss'],
})
export class Login {

  loginFormModel = signal<LoginFormModel>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginFormModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    required(schemaPath.password, {message: 'Password is required'});
    email(schemaPath.email, {message: 'Please enter a valid email address'});
  });

  constructor(private router: Router){

  }

  login(event: Event) {
    event.preventDefault();
    console.log(this.loginFormModel());
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  } 
}
