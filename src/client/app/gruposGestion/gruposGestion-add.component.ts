/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
import { Component, OnInit } from '@angular/core';
import { GruposGestion } from '../_models/gruposGestion';
import { GruposGestionService } from '../_services/grupoGestion.service';
import { Router } from '@angular/router';

@Component( {
               moduleId: module.id,
               templateUrl: 'gruposGestion-add.component.html',
               selector: 'gruposGestion-add'
            } )
export class GruposGestionAddComponent implements OnInit {

   grupoGestion: GruposGestion = new GruposGestion();
   gruposGestion: GruposGestion[];
   codeExists: boolean = false;
   currentDate: Date = new Date( Date.now() );
   displayDialog: boolean = false;
   isRequired = false;
   isGreater = true;
   private es: any;

   constructor( private gruposGestionService: GruposGestionService, private router: Router ) {
      gruposGestionService.listGruposGestion().subscribe( res => {
         this.gruposGestion = res;
      } );
   }

   ngOnInit(): void {

      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };
   }

   validateGreater() {
      if ( this.grupoGestion.fechaInicio !== null && this.grupoGestion.fechaFin !== null && this.grupoGestion.fechaInicio < this.grupoGestion.fechaFin ) {
         this.isGreater = true;
      } else {
         this.isGreater = false;
      }
   }

   clearSelection() {
      this.isRequired = false;
      this.isGreater = true;
      this.grupoGestion.fechaFin = null;
      this.grupoGestion.fechaInicio = null;
   }

   createGruposGestion() {
      this.gruposGestionService.addGruposGestion( this.grupoGestion ).then( data => {
         this.router.navigate( [ 'gruposGestion' ] )
      } );
   }

   validateCode() {
      this.codeExists = this.gruposGestion.filter( t => t.codigoGrupoGestion === this.grupoGestion.codigoGrupoGestion ).length > 0;
   }

   inputCleanUp( value: string ) {
      this.grupoGestion.codigoGrupoGestion = value.toUpperCase().replace( /[^A-Z0-9]/, '' ).trim();
   }

   goBack(): void {
      this.router.navigate( [ 'gruposGestion' ] );
   }

   onSelectMethod( event: any ) {
      let d = new Date( Date.parse( event ) );
      console.info( d );
      console.info( this.grupoGestion.fechaInicio );
   }

   capitalizeName() {
      let input = this.grupoGestion.grupoGestion;
      if ( input !== '' && input !== null ) {
         this.grupoGestion.grupoGestion = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }
}