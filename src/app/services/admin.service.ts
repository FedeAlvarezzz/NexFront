import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../interface/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) { }

}
