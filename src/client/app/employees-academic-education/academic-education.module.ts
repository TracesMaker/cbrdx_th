import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { FormalStudiesComponent }  from './formal-studies.component';
import { FormalStudiesDetailComponent }  from './formal-studies-detail.component';
import { FormalStudiesAddComponent }  from './formal-studies-add.component';
import { FormalStudiesUpdateComponent }  from './formal-studies-update.component';

import { NoFormalStudiesComponent }  from './no-formal-studies.component';
import { NoFormalStudiesDetailComponent }  from './no-formal-studies-detail.component';
import { NoFormalStudiesAddComponent }  from './no-formal-studies-add.component';
import { NoFormalStudiesUpdateComponent }  from './no-formal-studies-update.component';

import { AcademicEducationService } from '../_services/academic-education.service';
import { InstituteServices } from '../_services/institute.service';
import { StudyLevelServices } from '../_services/study-level.service';
import { StudyAreaServices } from '../_services/study-area.service';
import { StudyStateServices } from '../_services/study-state.service';
import { StudyTypeServices } from '../_services/study-type.service';
import { StudyIntensityServices } from '../_services/study-intensity.service';

import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule,
        ConfirmDialogModule,AutoCompleteModule,CheckboxModule,MessagesModule } from 'primeng/primeng';
import {SharedModule} from "../shared/shared.module";


@NgModule({
    imports:      [ CommonModule,InputTextModule,FormsModule,ReactiveFormsModule,DataTableModule,
                    ButtonModule,DialogModule,InputTextareaModule,CalendarModule,
                    DropdownModule,ConfirmDialogModule,AutoCompleteModule,CheckboxModule, MessagesModule,SharedModule
                    ],
    declarations: [
                    FormalStudiesComponent,
                    FormalStudiesAddComponent,
                    FormalStudiesUpdateComponent,
                    FormalStudiesDetailComponent,
                    NoFormalStudiesComponent,
                    NoFormalStudiesAddComponent,
                    NoFormalStudiesUpdateComponent,
                    NoFormalStudiesDetailComponent
                    ],
    bootstrap:    [FormalStudiesComponent],
    providers:    [AcademicEducationService, StudyLevelServices, StudyAreaServices, StudyStateServices,
                  InstituteServices, StudyTypeServices, StudyIntensityServices],
    exports: 	  [FormalStudiesComponent,NoFormalStudiesComponent]
})
export class AcademicEducationModule { }
