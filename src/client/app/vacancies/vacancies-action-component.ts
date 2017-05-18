import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message, SelectItem } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Employee } from '../_models/employees';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';

@Component( {
               moduleId: module.id,
               templateUrl: 'vacancies-action-component.html',
               selector: 'vacancies-action'
            } )
export class VacantesActionComponent {

   msg: Message;
   employee: Employee = new Employee();
   listCategory: SelectItem[] = [];

   constructor( private router: Router,
      private listaService: ListaService,
      private navService: NavService ) {

   }
   ngOnInit() {
      this.listaService.getMasterDetails( 'ListasClasificacionesSedes' ).subscribe( res => {
         this.listCategory.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listCategory.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
   }
   goBack(): void {
   }

   save() {

   }

}
