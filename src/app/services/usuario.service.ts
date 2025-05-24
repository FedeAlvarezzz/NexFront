
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class UsuarioService {

  private url = "http://localhost:8080/api/usuarios";

  constructor(private http: HttpClient) { }

  public registrarUsuario(registroDTO: RegistroDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.url}/registrar-usuario`, registroDTO)

  }

  
  
}
