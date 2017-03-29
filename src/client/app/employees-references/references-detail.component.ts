import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {References} from './references';
import {ReferencesService} from './references.service';

import 'rxjs/add/operator/switchMap';
import {LocateService} from "../_services/locate.service";
import {PoliticalDivisionService} from "../_services/political-division.service";
import {ReferencesTypesService} from "../_services/references-type.service";

@Component({
    moduleId: module.id,
    selector: 'references',
    templateUrl: './references-detail.component.html',
})

export class ReferencesDetailComponent implements OnInit   {
    reference: References = new References();

    constructor(
        private referencesService: ReferencesService,
        private locateService: LocateService,
        private referencesTypeService: ReferencesTypesService,
        private politicalDivisionService: PoliticalDivisionService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.referencesService.get(+params['id']))
            .subscribe(reference => {
              this.reference = reference;
              this.reference.direccion = 'Cargando..';
              this.reference.ciudad = 'Cargando..';
              this.locateService.getById(this.reference.idLocalizacion).subscribe(localizacion => {
                this.reference.direccion = localizacion.direccion;
                this.politicalDivisionService.getById(localizacion.idDivisionPolitica).subscribe(ciudad => {
                  this.reference.ciudad = ciudad.descripcionDivisonPolitica;
                });
              });
              this.reference.tipodeReferencia = {value: null, label: 'Cargando...'};
              this.referencesTypeService.getById(this.reference.idTipoReferencia)
                .subscribe(tipo => this.reference.tipodeReferencia.label = tipo.nombreListaTipoReferencia);
            });
    }

    goBack(): void {
        this.location.back();
    }
}

