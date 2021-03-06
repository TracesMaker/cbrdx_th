import { NgModule } from '@angular/core';
import {
   InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule, CalendarModule, TreeModule, TabViewModule, DropdownModule,
   FieldsetModule, GrowlModule
} from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { SharedModule } from '../shared/shared.module';
import { OcupacionesService } from '../_services/ocupaciones.service';
import { OcupacionesComponent } from './ocupaciones.component';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { FormSharedModule } from '../shared/form-shared.module';


@NgModule( {
              imports: [ CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule,
                 CalendarModule, TreeModule, TabViewModule, DropdownModule,
                 FieldsetModule, AutoCompleteModule, GrowlModule, SharedModule, FormSharedModule
              ],
              declarations: [ OcupacionesComponent ],
              bootstrap: [ OcupacionesComponent ],
              providers: [ OcupacionesService ],
              exports: [ OcupacionesComponent ]
           } )
export class OcupacionesModule {

}
