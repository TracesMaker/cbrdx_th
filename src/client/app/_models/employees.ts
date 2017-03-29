import { Injectable } from '@angular/core';

@Injectable()
export class Employee {

  public idTercero : number;
  public primerNombre  : string;
  public segundoNombre : string;
  public primerApellido  : string;
  public segundoApellido : string;
  public nombreCompleto?  : string;
  public idTipoDocumento : number;
  public tipoDocumento? : string;
  public numeroDocumento : string;
  public fechaDocumento  : string;
  public idCiudadExpDocumento  : number ;
  public ciudadExpDocumento  : string ;
  public fechaNacimiento : string;
  public idCiudadNacimiento  : number ;
  public ciudadNacimiento  : string ;
  public idGenero  : number;
  public genero  : string;
  public idEstadoCivil  : number;
  public estadoCivil? : string;
  public idFactorRh  : number;
  public factorRh?  : string;
  public nroHijos? : number;
  public idLateralidad? : number;
  public lateralidad? : string;
  public idTipoVivienda? : number;
  public vivienda?  : string;
  public estrato? : number;
  public tallaCamisa? : number;
  public tallaPantalon? : number;
  public tallaCalzado?  : number;
  public correoElectronico?  : string;
  public fechaCreacion?  : string;
  public idTipoPersona : number;
  public razonSocial?: string;
  public talla: number;
  public peso: number;
  public imc: number;
  public idProfesion: number;
  public profesion? : string;
  public idNivelEducacion: number;
  public nivelEducacion? : string;
  public idVehiculo: number;
  public auditoriaUsuario: number;
  public auditoriaFecha: Date;
  public telefonoFijo: string;
  public telefonoCelular: string;
  public imagen?  : string;
  public cargoActual? : string;
  public nacionalidad?  : string;
  public fechaDefuncion? : string;
  public indicadorVivo : boolean;//eje: (true, false)
  public indicadorHabilitado : boolean;//eje: (true, false)
  public idCoberturaSalud : number;//eje: (Contributivo, Subsidiado Total/Parcial,Ninguno)
  public idEstadoJuridico : number;//eje: (Contributivo, Subsidiado Total/Parcial,Ninguno)
  public idTipoAfiliacion : number;//eje: (cotizante)
  public idTipoOcupacion : number;//eje: (Independiente, Dependiente)
  public idOcupacion : number; //eje: (Comercial,)
  public idSectorEconomico : number;
  public idActividadEconomica : number;
  

  constructor() {
    this.nombreCompleto = '';
    this.nacionalidad = '';
    this.cargoActual = '';
    this.genero = '';
    this.razonSocial = '';
  
    this.auditoriaUsuario = 1;
    this.correoElectronico = "";
    this.estrato = 0;
    this.factorRh = "";
    this.idActividadEconomica =  null;
    this.idCiudadExpDocumento = null;
    this.idCiudadNacimiento = null;
    this.idCoberturaSalud = null;
    this.idEstadoCivil = null;
    this.idEstadoJuridico = null;
    this.idFactorRh = null;
    this.idGenero = null;
    this.idLateralidad = null;
    this.idNivelEducacion = null;
    this.idOcupacion = null;
    this.idProfesion = null;
    this.idSectorEconomico = null;
    this.idTipoAfiliacion = null;
    this.idTipoDocumento = null;
    this.idTipoOcupacion = null;
    this.idTipoPersona = null;
    this.idTipoVivienda = null;
    this.idVehiculo = null;
    this.imagen = "";
    this.imc = 0;
    this.indicadorVivo = true;
    this.nroHijos = 0,
    this.numeroDocumento = "";
    this.peso = 0;
    this.primerApellido = "";
    this.primerNombre = "";
    this.razonSocial = "";
    this.segundoApellido = "";
    this.segundoNombre = "";
    this.talla = 0;
    this.tallaCalzado = 0;
    this.tallaCamisa = 0;
    this.tallaPantalon = 0;
    this.telefonoCelular = "";
    this.telefonoFijo = "";
    this.fechaCreacion = "";
    this.fechaDefuncion = "";
    this.fechaDocumento = "";
    this.fechaNacimiento = "";
  }
}
