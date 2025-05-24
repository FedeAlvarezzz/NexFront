import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
 providedIn: 'root'
})
export class UsuarioService {


 private usuarioURL = "http://localhost:8080/api/usuarios";


 constructor(private http: HttpClient) { }

}