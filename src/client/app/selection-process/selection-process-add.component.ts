import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { EmployeeVehicleService } from '../_services/employee-vehicles.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { Publications } from '../_models/publications';
import { VacanciesService } from '../_services/vacancies.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { PositionsService } from '../_services/positions.service';
import { PublicationsQuestionnaries } from '../_models/publicationsQuestionnnaries';
import { PublicationQuestionnairesService } from '../_services/publication-questionnaires.service';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { Questionnaries } from '../_models/questionnaries';
import { PublicationsService } from '../_services/publications.service';
import { RequirementReferralsServices } from '../_services/requirement-referrals.service';
import { RequirementReferral } from '../_models/requirementReferral';
import { PhysicStructureService } from '../_services/physic-structure.service';
@Component( {
               moduleId: module.id,
               selector: 'selecction-process-add',
               templateUrl: 'selection-process-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class SelectionProcessAddComponent implements OnInit {

   publication: Publications = new Publications();
   vacancy: PersonnelRequirement = new PersonnelRequirement();
   requirementReferrals: RequirementReferral[] = [];
   listTypeJob: SelectItem[] = [];
   listLevelStudy: SelectItem[] = [];
   msgs: Message[] = [];
   acordion: number;
   es: any;
   minDate: Date = null;
   maxDateF: Date = null;
   range: string;

   // var cuestionarios
   publicationsQuestionnaires: PublicationsQuestionnaries[] = [];
   allPublicationsQuestionnaires: PublicationsQuestionnaries[] = [];
   private questionnaries: Questionnaries[] = [];
   private questionnariesList: SelectItem[] = [];
   private questionnarie: Questionnaries = new Questionnaries();
   // fin var cuestionarios

   constructor( private employeeVehicleService: EmployeeVehicleService,
      private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private vacanciesService: VacanciesService,
      private questionnairesService: QuestionnairesService,
      private publicationQuestionnairesService: PublicationQuestionnairesService,
      private positionsService: PositionsService,
      private publicationsService: PublicationsService,
      private physicStructureService: PhysicStructureService,
      private referralsServices: RequirementReferralsServices,
      private listEmployeesService: ListEmployeesService,
      private politicalDivisionService: PoliticalDivisionService,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {
   }

   ngOnInit() {
      this.acordion = 0;
      let today = new Date();
      let year = today.getFullYear();
      let lastYear = year + 50;
      this.range = `${year}:${lastYear}`;
      this.minDate= new Date;
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
         this.vacanciesService.get( +params[ 'idReq' ] ).subscribe( data => {
            this.vacancy = data;
            if ( data.idPublicacion ) {
               this.publicationsService.getById( data.idPublicacion ).subscribe( data => {
                  this.publication = data;
                  this.maxDateF = new Date(this.publication.fechaInicio);
               } );
            } else {
               this.physicStructureService.getById(this.vacancy.idEstructuraFisica).subscribe(data=>{
                  this.publication.lugarTrabajo= data.direccion;
               });
               this.positionsService.get( this.vacancy.idCargo ).subscribe( res => {
                  this.publication.idNivelEducacion = res.idNivelEducacion;
                  this.publication.descripcionGeneral = res.mision;
               } );
            }
         } );
         this.referralsServices.getAllRequirement( +params[ 'idReq' ] ).subscribe( ref => {
            this.requirementReferrals = ref;
         } );
      } );

      this.listaService.getMasterDetails( 'ListasTiposTrabajos' ).subscribe( res => {
         this.listTypeJob.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listTypeJob.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasNivelesEstudios' ).subscribe( res => {
         this.listLevelStudy.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listLevelStudy.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.publicationQuestionnairesService.getAllByPublication( 9 ).subscribe( res => {
         this.allPublicationsQuestionnaires = res;
         this.questionnairesService.getAllEnabled().subscribe( qst => {
            this.questionnariesList.push( { label: 'Seleccione...', value: null } );
            this.questionnaries = qst;
            this.allPublicationsQuestionnaires.map( pq => {
               if ( pq.indicadorHabilitado === false ) {
                  this.pushQuestionnaireOption( pq.idCuestionario );
               } else {
                  this.publicationsQuestionnaires.push( pq );
               }
            } )
         } );
      } );

   }

   onSubmit() {

      if(this.publication.idPublicacion===null || this.publication.idPublicacion=== undefined){
         this.publication.idRequerimiento = this.vacancy.idRequerimiento;
         this.publicationsService.add( this.publication ).subscribe( res => {
            this.publication= res;
            this._nav.setMesage( 1, this.msgs );
            this.acordion=1;
         } );
      }else{
         this.publicationsService.update( this.publication ).subscribe( res => {
            this._nav.setMesage( 2, this.msgs );
         } );
         this.acordion=1;
      }


   }
   onSelectBegin(){
      this.maxDateF= this.publication.fechaInicio;
   }

   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();

   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this._nav.setTab( 5 );
                                              this.location.back();
                                           }
                                        } );
   }

   searchCity( event: any ) {

   }

   captureCity( event: any ) {

   }

   // funciones cuestionarios

   sendBefore( questionnaire: PublicationsQuestionnaries ) {
      let myIndex = this.publicationsQuestionnaires.indexOf( questionnaire );
      if ( myIndex < this.publicationsQuestionnaires.length ) {
         let newOrder = this.publicationsQuestionnaires[ myIndex ].orden;
         this.publicationsQuestionnaires[ myIndex ].orden = this.publicationsQuestionnaires[ myIndex + 1 ].orden;
         this.publicationQuestionnairesService.update( this.publicationsQuestionnaires[ myIndex ] ).subscribe( res => {
            if ( res.ok ) {
               this.publicationsQuestionnaires[ myIndex + 1 ].orden = newOrder;
               this.publicationQuestionnairesService.update( this.publicationsQuestionnaires[ myIndex + 1 ] ).subscribe( res => {
                  if ( res.ok ) {
                     this.sortPublicationQuestionaries();
                  }
               } );
            }
         } );
      }
   }

   sendAfter( questionnaire: PublicationsQuestionnaries ) {
      let myIndex = this.publicationsQuestionnaires.indexOf( questionnaire );
      if ( myIndex > 0 ) {
         let newOrder = this.publicationsQuestionnaires[ myIndex ].orden;
         this.publicationsQuestionnaires[ myIndex ].orden = this.publicationsQuestionnaires[ myIndex - 1 ].orden;
         this.publicationQuestionnairesService.update( this.publicationsQuestionnaires[ myIndex ] ).subscribe( res => {
            if ( res.ok ) {
               this.publicationsQuestionnaires[ myIndex - 1 ].orden = newOrder;
               this.publicationQuestionnairesService.update( this.publicationsQuestionnaires[ myIndex - 1 ] ).subscribe( res => {
                  if ( res.ok ) {
                     this.sortPublicationQuestionaries();
                  }
               } );
            }
         } );
      }
   }

   disableQuestionnaire( questionnaire: PublicationsQuestionnaries ) {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que lo desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              let myIndex = this.publicationsQuestionnaires.indexOf( questionnaire );
                                              questionnaire.indicadorHabilitado = false;
                                              this.publicationQuestionnairesService.update( questionnaire ).subscribe( res => {
                                                 if ( res.ok ) {
                                                    for ( let i = myIndex + 1; i++; i < this.publicationsQuestionnaires.length ) {
                                                       this.publicationsQuestionnaires[ i ].orden -= 1;
                                                    }
                                                    this.publicationsQuestionnaires.slice( myIndex, 1 );
                                                    this.sortPublicationQuestionaries();
                                                 }
                                              } );
                                           },
                                           reject: () => {
                                           }
                                        } );
   }

   private sortPublicationQuestionaries() {
      this.publicationsQuestionnaires.sort( function ( a, b ) {
         if ( a.orden < b.orden )
            return -1;
         else
            return 1;
      } )
   }

   addPublicationsQuestionnaire() {
      let pq: PublicationsQuestionnaries = new PublicationsQuestionnaries();
      pq = this.allPublicationsQuestionnaires.find( pqs => pqs.idCuestionario === this.questionnarie.idCuestionario );
      if ( pq !== undefined && pq.idPublicacionCustionario !== undefined && pq.idPublicacionCustionario !== null ) {
         pq.indicadorHabilitado = true;
         pq.orden = this.publicationsQuestionnaires.length;
         this.publicationQuestionnairesService.update( pq ).subscribe( res => {
            if ( res.ok ) {
               this.publicationsQuestionnaires.push( pq );
            }
         } );
      }
   }

   private pushQuestionnaireOption( idCuestionario: number ) {
      let qst = this.questionnaries.find( q => q.idCuestionario === idCuestionario );
      qst ? this.questionnariesList.push( { label: qst.codigo + ':' + qst.cuestionario, value: qst.idCuestionario } ) : null;
   }

   // fin funciones cuestionarios

}