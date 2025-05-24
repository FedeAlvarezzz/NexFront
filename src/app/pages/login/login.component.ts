import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { LoginDTO } from '../../interface/login-dto';
import { Router } from '@angular/router';
import { error } from 'console';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: LoginDTO = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) { }

  public login(){
    const loginDTO: LoginDTO = {
      email: this.loginForm.email,
      password: this.loginForm.password
    }
    this.authService.iniciarSesion(loginDTO).subscribe({
      next: (data) => {
        this.tokenService.login(data.mensaje.token);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.mensaje
        });
      }
  });
  }
}

