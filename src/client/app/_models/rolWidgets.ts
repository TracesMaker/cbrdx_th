import { Injectable } from '@angular/core';

@Injectable()
export class RolWidgets {
   public idRolWidget: number;
   public idRol: number;
   public idWidget: number;
   public widget: string;
   public indicadorHabilitado: boolean;
   public indicadorObligatorio: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;

   constructor() {
      this.indicadorHabilitado = true;
      this.indicadorObligatorio = false;
      this.auditoriaUsuario = 1;
      this.auditoriaFecha = '';
   }
}
