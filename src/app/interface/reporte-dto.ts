export interface ReporteDTO {
    id: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    fecha: Date;
    categoria: string;
    estadoActual: string;
    ubicacion: UbicacionDTO;
    ciudad: string;
    votosImportancia: number;
 }
 
 
 export interface UbicacionDTO {
    latitud: number;
    longitud: number;
 }
 