/**
 * Created by TracesMaker on 06/02/2017.
 */
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
// import 'rxjs/add/operator/toPromise';

import { ColaboradoresComponent }  from './colaboradores.component';
import { ColaboradoresService } from './colaboradoresservice';
import { InputTextModule,DataTableModule,ButtonModule,DialogModule } from 'primeng/primeng';

@NgModule({
    imports:      [CommonModule,InputTextModule,FormsModule,DataTableModule,ButtonModule,DialogModule],
    declarations: [ColaboradoresComponent],
    bootstrap:    [ColaboradoresComponent],
    providers:    [ColaboradoresService],
    exports: 	  [ColaboradoresComponent]
})
export class ColaboradoresModule { }
