import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { PositionCompetencies } from '../_models/positionCompetencies';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class PositionCompetenciesServices {

   private serviceURL = '<%= SVC_TH_URL %>/api/cargosCompetencias/';
   private jwtHelper: JwtHelper = new JwtHelper();
   private usuarioLogueado: any;
   private idUsuario: number;

   constructor( private authHttp: AuthHttp ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
      }
   }

   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as PositionCompetencies[] );
   }

   getAllByPosition( id: number ): Observable<PositionCompetencies[]> {
      return this.authHttp.get( this.serviceURL + 'buscarCargo/' + id ).map( ( res: Response ) => res.json() as PositionCompetencies[] );
   }

   add( f: PositionCompetencies ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: PositionCompetencies ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as PositionCompetencies );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
