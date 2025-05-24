import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../interface/mensaje-dto';
import { LoginDTO } from '../interface/login-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = "http://localhost:8080/api/usuarios";

  constructor(private http: HttpClient) { }

  
  
}
