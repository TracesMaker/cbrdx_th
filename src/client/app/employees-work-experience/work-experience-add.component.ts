import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { Workexperience } from '../_models/work-experience';
/* Services */
import { ActividadEconomicaService } from '../_services/actividadEconomica.service';
import { WorkExperienceService } from '../_services/work-experience.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { DivisionPolitica } from '../_models/divisionPolitica';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { NavService } from '../_services/_nav.service';
/* Library */
import * as moment from 'moment/moment';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               selector: 'work-experience-formal',
               templateUrl: 'work-experience-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class WorkExperienceAddComponent implements OnInit {
   @Input()

   experience: Workexperience = new Workexperience();
   header: String = 'Agregando Experiencia Laboral';
   cityList: any;
   city: string;
   backupcity: string;
   resultCity: DivisionPolitica[];
   sector: SelectItem[] = [];
   activities: SelectItem[] = [];
   officeLevel: SelectItem[] = [];
   msgs: Message[] = [];
   minDate: Date;
   maxDateIngreso: Date = new Date( Date.now() );
   maxDateFinal: Date = new Date( Date.now() );
   es: any;
   range: string;
   fechaIngresa: string;
   fechaTermina: string;
   idTercero: number;

   constructor( private workExperienceService: WorkExperienceService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private location: Location,
      private actividadEconomicaService: ActividadEconomicaService,
      private politicalDivisionService: PoliticalDivisionService,
      private listaService: ListaService,
      private listEmployeesService: ListEmployeesService,
      private route: ActivatedRoute,
      private _nav: NavService ) {

      this.actividadEconomicaService.listByPadre( 0 ).subscribe( res => {
         this.sector.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.sector.push( {
                                 label: dp.actividadEconomica,
                                 value: dp.idActividadEconomica
                              } );
         }
      } );

      this.listaService.getMasterDetails( 'ListasNivelesCargos' ).subscribe( res => {
         this.officeLevel.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.officeLevel.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

   }

   ngOnInit() {
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
      this.route.params.subscribe( ( params: Params ) => {
         this.idTercero = params[ 'tercero' ];
      } );
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let lastYear = year - 80;
      this.minDate = new Date();
      this.minDate.setFullYear( lastYear, month );
      this.range = `${lastYear}:${year}`;
      this.focusUP();

   }

   onSubmit() {
      this.focusUP();
      if ( this.city !== this.backupcity ) {
         this.city = '';
         this.experience.idCiudad = null;
      }

      if ( this.city === this.backupcity ) {
         this.msgs = [];
         // let mom: moment.Moment = moment( this.fechaIngresa, 'MM/DD/YYYY' );
         // this.experience.fechaIngresa = mom.format( 'YYYY-MM-DD' );
         // if ( this.experience.indicadorActualmente === false ) {
         //    let mom3: moment.Moment = moment( this.fechaTermina, 'MM/DD/YYYY' );
         //    this.experience.fechaTermina = mom3.format( 'YYYY-MM-DD' );
         // }
         this.experience.idTercero = this.idTercero;
         this.workExperienceService.add( this.experience )
         .subscribe( data => {
            // 1:add 2:update 3:error
            this._nav.setMesage( 1, this.msgs );
            this._nav.setTab( 7 );
            this.location.back();
         }, error => {
            // 1:add 2:update 3:error
            this._nav.setMesage( 3, this.msgs );
         } );
      }
   }

   goBack(fDirty : boolean): void {

      if ( fDirty ){
         this.confirmationService.confirm( {
            message: ` ¿Está seguro que desea salir sin guardar?`,
            header: 'Confirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
               this._nav.setTab( 7 );
               this.location.back();
            }
         } );
      }else {
         this._nav.setTab( 7 );
         this.location.back();
      }
   }

   onSelectMethodCalendarIngreso( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.minDate= new Date();
      this.minDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
   }

   onSelectMethodCalendarFinalizacion( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.maxDateIngreso= new Date();
      this.maxDateIngreso.setFullYear( d.getFullYear(), d.getMonth(), );
   }

   focusUP() {
      const element = document.querySelector( '#formulario' );
      if ( element ) {
         element.scrollIntoView( element );
      }
   }

   searchCity( event: any ) {
      this.politicalDivisionService.getAllCities( event.query ).subscribe(
         lis => this.cityList = lis
      );
   }

   captureCity( event: any ) {
      this.experience.idCiudad = event.idDivisionPolitica;
      this.city = event.camino;
      this.backupcity = event.camino;
   }

   updateActivities( value: number ) {
      this.activities = [];
      this.actividadEconomicaService.listLastChild( value ).subscribe( res => {
         this.activities.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.activities.push( {
                                     label: dp.actividadEconomica,
                                     value: dp.idActividadEconomica
                                  } );
         }
      } );
   }

}


