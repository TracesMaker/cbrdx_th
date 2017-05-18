import { Injectable } from '@angular/core';

@Injectable()
export class Vacancies {

   idRequerimiento: number;
   idCargo: number;
   cargo: string;
   fechaSolicitud: Date;
   idEstructuraOrganizacional: number;
   estructuraOrganizacional: string;
   idEstructuraFisica: number;
   estructuraFisica: string;
   idTipoSolicitud: number;
   tipoSolicitud: string;
   idJefe: number;
   cargoJefe: string;
   idCategoria: number;
   categoria: string;
   idEstado: number;
   estado: string;
   idSolicitante: number;
   nombreSolicitante: string;
   cantidadVacantes: number;
   cantidadConvocados: number;
   indicadorAutorizacion: boolean;
   autorizacion: string;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}