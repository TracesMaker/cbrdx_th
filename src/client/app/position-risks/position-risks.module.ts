import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { RiskComponent } from './position-risks.component';
import { FormSharedModule } from '../shared/form-shared.module';
import { RiskService } from '../_services/positios-risks.service';
import { SharedModule } from '../shared/shared.module';
import { InputSwitchModule } from 'primeng/primeng';

@NgModule( {
              imports: [
                 FormSharedModule,
                 SharedModule, ReactiveFormsModule,
                 InputSwitchModule
              ],
              declarations: [
                 RiskComponent
              ],
              bootstrap: [ RiskComponent ],
              providers: [ RiskService ],
              exports: [ RiskComponent ]
           } )
export class RiskModule {
}
