/**
 * Created by TracesMaker on 06/02/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Colaborador } from './colaboradores';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


import 'rxjs/add/operator/toPromise';
import any = jasmine.any;

@Injectable()
export class ColaboradoresService {

    constructor(private http: Http) {}

    getAllColaboradores()  {
        return this.http.get('/api/colaboradores').map((res:Response) => res.json().data);
    }


    addColaborador(c: Colaborador) {
        return this.http.post('/api/colaboradores',c).map((res:Response) => res.json().data);
    };


    getColaborador(id: number) {
        const respuesta =  this.http.get('/api/colaboradores/'+ id);
        const mapeada = respuesta.map((res:Response) => res.json().data as Colaborador)
        return mapeada;
    }

}
