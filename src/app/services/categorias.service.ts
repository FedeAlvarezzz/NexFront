import { Injectable } from "@angular/core";
import { CategoriaDTO } from "../interface/categoria-dto";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MensajeDTO } from "../interface/mensaje-dto";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private url = "http://localhost:8080/api/categorias";

  constructor(private http: HttpClient) {
  }

  public listar() {
    return this.http.get<CategoriaDTO[]>(`${this.url}/listar`);
  }

  public crear(crearCategoriaDTO: CategoriaDTO) {
    return this.http.post<MensajeDTO>(`${this.url}/crear`, crearCategoriaDTO);
  }

  public obtener(id: string): Observable<CategoriaDTO> {
    return this.http.get<CategoriaDTO>(`${this.url}/obtener/${id}`);
  }

  public eliminar(id: string) {
    return this.http.delete<MensajeDTO>(`${this.url}/eliminar/${id}`);
  }

  public editar(id: string, editarCategoriaDTO: CategoriaDTO) {
    return this.http.put<MensajeDTO>(`${this.url}/editar/${id}`, editarCategoriaDTO);
  }

}