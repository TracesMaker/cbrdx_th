/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 6/03/2017.
 */
export class DivisionPolitica {
    idDivisionPolitica: number;
    idDivisionPoliticaPadre: number = 0;
    codigoDivisionPolitica: string;
    descripcionDivisonPolitica: string;
    indicativoDivisonPolitica: number;
    codigoPostalDivisionPolitica: string;
    idDivisionPoliticaTipo: number;
    idDivisionPoliticaArea: number;
    idEstratoDivisionPolitica: number = 0;
    idDivisionPoliticaResguardo:number;
    idDivisionPoliticaComuna:number;
    idDIvisionPoliticaLocalidad:number;
    indicadorHabilitado: boolean = true;
    auditoriaUsuario: number;
    auditoriaFecha: Date;

}