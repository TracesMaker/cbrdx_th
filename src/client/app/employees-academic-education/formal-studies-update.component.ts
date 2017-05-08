import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormalStudies } from './formal-studies';
import { AcademicEducationService } from '../_services/academic-education.service';
import { Message, ConfirmationService } from 'primeng/primeng';
import { StudyLevelServices } from '../_services/study-level.service';
import * as moment from 'moment/moment';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { DivisionPolitica } from '../_models/divisionPolitica';
import { NavService } from '../_services/_nav.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               selector: 'academic-education-formal-update',
               templateUrl: 'formal-studies-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class FormalStudiesUpdateComponent implements OnInit {

   @Input()
   cityList: DivisionPolitica[] = [];
   selectedCity: DivisionPolitica = new DivisionPolitica();
   fstudy: FormalStudies = new FormalStudies();
   header: string = 'Editando Estudio Formal';
   submitted: boolean;
   msgs: Message[] = [];
   studyLevelList: any[] = [];
   studyAreaList: any[] = [];
   studyStateList: any[] = [];
   instituteList: ListaItem[] = [];
   selectedInstitute: ListaItem = new ListaItem();
   minDate: Date = null;
   maxDate: Date = null;
   maxDateFinal: Date = null;
   es: any;
   range: string;
   id_estado_estudio_finalizado = 1; //hace falta definir acceso a constantes en servicio
   idTercero: number;
   wrongCity: boolean = true;
   wrongInstitute: boolean = true;

   constructor( private academicEducationService: AcademicEducationService,
      private politicalDivisionService: PoliticalDivisionService,
      private studyLevelServices: StudyLevelServices,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {
   }

   ngOnInit(): void {
      this.setInitRanges();

      this.listaService.getMasterDetails( 'ListasNivelesEstudios' ).subscribe( res => {
         this.studyLevelList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.studyLevelList.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasAreasEstudios' ).subscribe( studyAreaList => {
         this.studyAreaList .push( { label: 'Seleccione', value: null } );
         studyAreaList.map( ( s: ListaItem ) => {
            this.studyAreaList.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasEstadosEstudios' ).subscribe( res => {
         this.studyStateList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.studyStateList.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.route.params.subscribe( ( params: Params ) => {
         this.idTercero = params[ 'tercero' ];
         this.academicEducationService.getFormal( +params[ 'id' ] ).subscribe( fstudy => {
            this.fstudy = fstudy;
            this.selectedCity = new DivisionPolitica();
            this.selectedCity.camino = this.fstudy.ciudad;
            this.selectedCity.idDivisionPolitica = this.fstudy.idCiudad;
            if ( this.fstudy.idCiudad ) {
               this.wrongCity = false;
            }
            if ( this.fstudy.idInstitucion ) {
               this.selectedInstitute = new ListaItem();
               this.selectedInstitute.nombre = this.fstudy.institucion;
               this.selectedInstitute.idLista = this.fstudy.idInstitucion;
            } else {
               this.selectedInstitute = null;
            }
            if ( this.fstudy.idInstitucion ) {
               this.wrongInstitute = false;
            }
            this.idTercero = this.fstudy.idTercero;
            let fi: moment.Moment = moment( this.fstudy.fechaIngresa, 'YYYY-MM-DD' );
            this.fstudy.fechaIngresa = fi.format( 'MM/DD/YYYY' );
            let ff: moment.Moment = moment( this.fstudy.fechaTermina, 'YYYY-MM-DD' );
            this.fstudy.fechaTermina = ff.format( 'MM/DD/YYYY' );
         } );
      } );

   }

   setInitRanges() {
      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let last18Year = year - 18;
      let lastYear = year - 100;
      this.maxDate = new Date();
      this.maxDate.setFullYear( year, month );
      this.minDate = new Date();
      this.minDate.setFullYear( lastYear, month );
      this.maxDateFinal = new Date();
      this.maxDateFinal.setMonth( month );
      this.maxDateFinal.setFullYear( year );
      this.range = `${lastYear}:${year}`;
   }

   onSubmit( value: string ) {
      this.submitted = true;
      if ( this.selectedCity !== undefined && this.selectedCity.idDivisionPolitica !== undefined ) {
         if ( (this.fstudy.otraInstitucion !== '' && this.fstudy.otraInstitucion !== null) || (this.selectedInstitute !== null && this.selectedInstitute.idLista !== null) ) {
            this.msgs = [];
            this.fstudy.idCiudad = this.selectedCity.idDivisionPolitica;
            this.fstudy.idTercero = this.idTercero;
            this.fstudy.indicadorHabilitado = true;
            if ( this.selectedInstitute !== null ) {
               this.fstudy.idInstitucion = this.selectedInstitute.idLista;
            } else {
               this.fstudy.idInstitucion = null;
            }
            let fi: moment.Moment = moment( this.fstudy.fechaIngresa, 'MM/DD/YYYY' );
            this.fstudy.fechaIngresa = fi.format( 'YYYY-MM-DD' );
            if ( this.fstudy.idEstado === this.id_estado_estudio_finalizado ) {
               let ff: moment.Moment = moment( this.fstudy.fechaTermina, 'MM/DD/YYYY' );
               this.fstudy.fechaTermina = ff.format( 'YYYY-MM-DD' );
            } else {
               this.fstudy.fechaTermina = null;
            }
            this.academicEducationService.updateFormal( this.fstudy ).subscribe(
               data => {
                  this.msgs.push( { severity: 'info', summary: 'Success', detail: 'Guardando' } );
                  this._nav.setTab( 6 );
                  this.location.back();
               } );
         } else {
            this.wrongInstitute = true;
         }
      } else {
         this.wrongCity = true;
      }
   }

   citySearch( event: any ) {
      this.politicalDivisionService.getAllCities( event.query ).subscribe(
         cities => this.cityList = cities
      );
   }

   captureCityId( event: any ) {
      this.fstudy.idCiudad = this.selectedCity.idDivisionPolitica;
      this.wrongCity = false;
   }

   instituteSearch( event: any ) {
      this.listaService.getMasterDetailsByWildCard( 'ListasInstituciones', event.query ).subscribe(
         instituteList => this.instituteList = instituteList
      );
   }

   captureInstituteId( event: any ) {
      this.fstudy.idInstitucion = this.selectedInstitute.idLista;
      this.fstudy.otraInstitucion = '';
      this.wrongInstitute = false;
   }

   removeInstitute() {
      if ( this.fstudy.otraInstitucion !== '' ) {
         this.selectedInstitute = null;
      }
   }

   onSelectBegin( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.fstudy.fechaIngresa = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.minDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
   }

   onSelectEnd( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.fstudy.fechaTermina = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.maxDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() ) - 1;
   }

   updateEnd(): void {
      if ( this.fstudy.idEstado !== this.id_estado_estudio_finalizado ) {
         this.fstudy.fechaTermina = undefined;
      }
   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea Cancelar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this._nav.setTab( 6 );
                                              this.location.back();
                                           }
                                        } );
   }

}
