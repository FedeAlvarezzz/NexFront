import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../interface/mensaje-dto';
import { LoginDTO } from '../interface/login-dto';
import { CodVerificacionDTO } from '../interface/cod-verificacion-dto';
import { ActivarUsuarioDTO } from '../interface/activar-usuario-dto';
import { ActualizarContrasenaDTO } from '../interface/actualizar-contrasena-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) { }

  public iniciarSesion(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.url}/login`, loginDTO);
  }

  public verificarUsuario(codVerificacionDTO: CodVerificacionDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.url}/verificar-usuario`, codVerificacionDTO);
  }

  public actualizarContrasena(actualizarContrasenaDTO: ActualizarContrasenaDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.url}/actualizar-contrasena`, actualizarContrasenaDTO);
  }

  public activarUsuario(activarUsuarioDTO: ActivarUsuarioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.url}/activar-usuario`, activarUsuarioDTO);
  }
  
  public recuperarUsuario(email: string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.url}/recuperar-usuario`, email);
  }
  
}
