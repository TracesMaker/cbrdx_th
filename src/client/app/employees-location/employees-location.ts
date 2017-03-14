import { Injectable } from '@angular/core';

@Injectable()
export class EmployeesLocation {
  idUbicacion:string;
  direccion:string;
  ciudad:{value: number, label: string};
  departamento:{value: number, label: string};
  pais:{value: number, label: string};
  tipoDireccion:{value: number, label: string};
  barrio:{value: number, label: string};
  correoElectronico:string;
  longitud :string;
  latitud:string;
  comoLlegar:string;
  celular:string;
  telefono:string;
  colaborador:number;

  constructor() {
    this.ciudad = {value: null, label: ''};
    this.barrio = {value: null, label: ''};
    this.departamento = {value: null, label: ''};
    this.pais = {value: null, label: ''};
    this.tipoDireccion = {value: null, label: ''};
  }

}
