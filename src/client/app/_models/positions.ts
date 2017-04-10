import { Injectable } from '@angular/core';

@Injectable()
export class Positions {
    public idCargo: number;
    public codigoCargo: string;
    public cargo: string;
    public indicadorHabilitado: boolean;
    public indicadorRequiereFormacion: boolean;
    public personaACargoDir: number;
    public personaACargoInd: number;
    public idCargoJefe: number;
    public idCategoria: number;
    public cargoJefe: string;
    public mision: string;
    public puntos: string;
    public categoria: string;
    public salario: number;
    public interrelacionesInternas: string;
    public interrelacionesExternas: string;
    public responsabilidadesAd: string;
    public tomaDecisiones: string;
    public actividadesSupervisa: string;
    public nivelEducacion: string;
    public conocimientosBasicos: string;
    public tiempoExperiencia: string;
    public otrosRequisitos: string;
    public cargaFisica: string;
    public cargaMental: string;
    public nivelPsicoSocial: string;
    public estructuraArea: string;
    public idEstructuraArea: number;
    public idNivelEducacion: number;
    public idGenero: number; //? falta este campo
    public idEstadoCivil: number; //? falta este campo
    public edad: number;
    public auditoriaUsuario: number;
    public auditoriaFecha: Date;
    public idListaEstadoCargo: number;
    public step: number;
    
    constructor() {
       this.idCargo = null;
       this.cargo = null;
       this.auditoriaUsuario = null;
       this.auditoriaFecha = null;
       this.personaACargoDir = null;
       this.personaACargoInd = null;
       this.idCargoJefe = null;
       this.cargoJefe = "";
       this.mision = "";
       this.puntos = null;
       this.idCategoria = null;
       this.categoria = "";
       this.salario = null;
       this.indicadorRequiereFormacion = true;
       this.indicadorHabilitado = false;
       this.interrelacionesInternas = "";
       this.interrelacionesExternas = "";
       this.responsabilidadesAd = "";
       this.tomaDecisiones = null;
       this.actividadesSupervisa = null;
       this.idNivelEducacion = null;
       this.nivelEducacion = null;
       this.conocimientosBasicos = null;
       this.tiempoExperiencia = null;
       this.otrosRequisitos = null;
       this.edad = null;
       this.cargaFisica = "";
       this.cargaMental = "";
       this.nivelPsicoSocial = null;
       this.codigoCargo = "";
       this.idEstructuraArea = null;
       this.estructuraArea = "";
       this.idListaEstadoCargo = null;
       this.step = 1;
    }
}
