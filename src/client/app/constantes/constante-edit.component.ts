import { Component } from '@angular/core';
import { Constante } from '../_models/constante';
import { VConstante } from '../_models/vconstante';
import { ConstanteService } from '../_services/constante.service';
import { ListaService } from '../_services/lista.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { Message } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               templateUrl: 'constante-edit.component.html',
               selector: 'constante-edit'
            } )
export class ConstanteEditComponent {

   constant: Constante = new Constante();
   constantList: VConstante[];
   constantType: any[] = [];
   codeExists: boolean = false;
   regex: string = '';
   displayDialog: boolean = false;
   msg: Message;

   constructor( private constanteService: ConstanteService, private listaService: ListaService, private router: Router,
      private route: ActivatedRoute, private navService: NavService ) {
      route.params.switchMap( ( params: Params ) => constanteService.viewConstant( +params[ 'id' ] ) )
      .subscribe( data => {
         this.constant = data;
         this.constanteService.listConstants().subscribe( res => {
            this.constantList = res;
         } );
         listaService.getMasterDetails( 'ListasTiposDatos' ).subscribe( res => {
            this.constantType = res;
            this.alterPattern();
         } );
      } );

   }

   createConstant() {
      this.constanteService.updateConstant( this.constant ).then( data => {
         this.router.navigate( [ 'constantes' ] );
         let typeMessage = 2; // 1 = Add, 2 = Update, 3 Error, 4 Custom
         this.navService.setMesage( typeMessage, this.msg );
      } );
   }

   validateCode() {
      this.codeExists = this.constantList.filter(
            t => t.constante === this.constant.constante && t.idConstante !== this.constant.idTipoDato ).length > 0;
   }

   inputCleanUp( value: string ) {
      if ( value ) {
         this.constant.constante = value.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
      }
   }

   alterPattern() {
      this.inputValue();
      let dataType = this.constantType.find( t => t.idLista === this.constant.idTipoDato );
      if ( dataType.codigo === 'NUM' ) {
         this.regex = '[0-9]{0,20}';
      } else {
         this.regex = '';
      }

   }

   goBack(): void {
      this.router.navigate( [ 'constantes' ] );
   }

   inputValue() {
      let label = this.constant.valor;
      if ( label !== '' && label !== null && label !== undefined && this.constant.idTipoDato !== null ) {
         let dataType = this.constantType.find( t => t.idLista === this.constant.idTipoDato );
         if ( dataType.codigo === 'NUM' ) {
            this.constant.valor = this.constant.valor.replace( /[^0-9]/g, '' );
         } else {
            this.constant.valor = label.replace( ' ', '' ).trim();
         }
      }
   }
}
