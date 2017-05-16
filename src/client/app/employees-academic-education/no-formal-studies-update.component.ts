import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { AcademicEducationService } from '../_services/academic-education.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Noformalstudies } from './no-formal-studies';
import { Message, ConfirmationService } from 'primeng/primeng';
import * as moment from 'moment/moment';
import { NavService } from '../_services/_nav.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               selector: 'academic-education-noformal',
               templateUrl: 'no-formal-studies-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class NoFormalStudiesUpdateComponent implements OnInit {

   @Input()
   nfstudy: Noformalstudies = new Noformalstudies();
   cityList: any;
   selectedCity: string;
   header: string = 'Editando Estudio No Formal';
   submitted: boolean;
   msgs: Message[] = [];
   studyLevelList: any[] = [];
   studyAreaList: any[] = [];
   studyTypeList: any[] = [];
   studyIntensityList: any[] = [];
   minDate: Date = null;
   maxDate: Date = new Date( Date.now() );
   maxDateFinal: Date = new Date( Date.now() );
   es: any;
   range: string;
   idTercero: number;
   fechaIngresa: string;
   fechaTermina: string;
   // hace falta definir acceso a constantes en servicio

   constructor( private academicEducationService: AcademicEducationService,
      private listaService: ListaService,
      private confirmationService: ConfirmationService,
      private politicalDivisionService: PoliticalDivisionService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
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

      this.listaService.getMasterDetails( 'ListasTiposEstudios' ).subscribe( res => {
         this.studyTypeList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.studyTypeList.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasIntensidades' ).subscribe( res => {
         this.studyIntensityList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.studyIntensityList.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.route.params.subscribe( ( params: Params ) => {
         this.idTercero = params[ 'tercero' ];
         this.academicEducationService.getNoFormal( +params[ 'id' ] ).subscribe( nfstudy => {
            this.nfstudy = nfstudy;
            this.selectedCity = this.nfstudy.ciudad;
            this.idTercero = this.nfstudy.idTercero;
            let fi: moment.Moment = moment( this.nfstudy.fechaIngresa, 'YYYY-MM-DD' );
            this.fechaIngresa = fi.format( 'MM/DD/YYYY' );
            this.onSelectBegin( this.fechaIngresa );
            if ( this.nfstudy.indicadorTerminacion === true ) {
               let ff: moment.Moment = moment( this.nfstudy.fechaTermina, 'YYYY-MM-DD' );
               this.fechaTermina = ff.format( 'MM/DD/YYYY' );
               this.onSelectEnd( this.fechaTermina );
            }
         } );
      } );

   }

   setInitRanges() {
      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre',
            'diciembre'
         ],
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
      if ( this.nfstudy.ciudad !== this.selectedCity ) {
         this.selectedCity = '';
         this.nfstudy.idCiudad = null;
      }
      if ( this.nfstudy.ciudad === this.selectedCity ) {
         this.msgs = [];
         this.nfstudy.idTercero = this.idTercero;
         this.nfstudy.indicadorHabilitado = true;

         let fi: moment.Moment = moment( this.fechaIngresa, 'MM/DD/YYYY' );
         this.nfstudy.fechaIngresa = fi.format( 'YYYY-MM-DD' );
         if ( this.nfstudy.indicadorTerminacion === true ) {
            let ff: moment.Moment = moment( this.fechaTermina, 'MM/DD/YYYY' );
            this.nfstudy.fechaTermina = ff.format( 'YYYY-MM-DD' );
         } else {
            this.nfstudy.fechaTermina = null;
         }
         this.academicEducationService.updateNoFormal( this.nfstudy )
         .subscribe( data => {
            this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
            this._nav.setTab( 6 );
            this.location.back();
         }, error => {
            this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
         } );
      }
   }

   citySearch( event: any ) {
      this.politicalDivisionService.getAllCities( event.query ).subscribe(
         cities => this.cityList = cities
      );
   }

   captureCityId( event: any ) {
      this.nfstudy.idCiudad = event.idDivisionPolitica;
      this.nfstudy.ciudad = event.camino;
      this.selectedCity = event.camino;
   }

   onSelectBegin( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.fechaIngresa = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.minDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
   }

   onSelectEnd( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.fechaTermina = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.maxDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() - 1 );
   }

   updateEnd(): void {
      if ( this.nfstudy.indicadorTerminacion ) {
         this.nfstudy.fechaTermina = '';
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

   changeTipoestudio( event: any ) {
      if ( this.nfstudy.idTipoEstudio !== null ) {
         this.nfstudy.otroEstudio = '';
      }
   }

   removeEstudio() {
      if ( this.nfstudy.otroEstudio !== '' ) {
         this.nfstudy.idTipoEstudio = null;
      }
   }

}
