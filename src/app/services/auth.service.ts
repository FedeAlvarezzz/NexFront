import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../interface/login-dto';
import { MensajeDTO } from '../interface/mensaje-dto';

@Injectable({
 providedIn: 'root'
})
export class AuthService {


 private authURL = "http://localhost:8080/api/auth";


 constructor(private http: HttpClient) { }

public login(loginDTO: LoginDTO): Observable<MensajeDTO> {
return this.http.post<MensajeDTO>(`${this.authURL}/login`, loginDTO);
}
}