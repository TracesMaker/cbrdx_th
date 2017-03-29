/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
import {Component, OnInit} from "@angular/core";
import {GruposGestion} from "../_models/gruposGestion";
import {GruposGestionService} from "../_services/grupoGestion.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import * as moment from 'moment/moment';

@Component({
    moduleId: module.id,
    templateUrl: 'gruposGestion-edit.component.html',
    selector: 'gruposGestion-edit'
})
export class GruposGestionEditComponent {

    grupoGestion: GruposGestion = new GruposGestion();
    gruposGestion: GruposGestion[];
    codeExists: boolean = false;
    currentDate: Date = new Date(Date.now());
    displayDialog: boolean = false;
    isRequired = false;
    isGreater = true;

    constructor(private gruposGestionService: GruposGestionService, private router: Router, private route: ActivatedRoute) {
        route.params.switchMap((params: Params) => gruposGestionService.viewGruposGestion(+params['id']))
            .subscribe(data => {
                this.grupoGestion = data;
                if (this.grupoGestion.fechaInicio != null) {
                    this.isRequired = true;
                    this.grupoGestion.fechaInicio = moment(this.grupoGestion.fechaInicio, "YYYY-MM-DD").toDate();
                    this.grupoGestion.fechaFin = moment(this.grupoGestion.fechaFin, "YYYY-MM-DD").toDate();
                    this.validateGreater();
                }
                gruposGestionService.listGruposGestion().subscribe(res => {
                    this.gruposGestion = res.filter(t => t.idGrupoGestion != this.grupoGestion.idGrupoGestion);
                });
            });
    }

    clearSelection() {
        this.isRequired = false;
        this.isGreater = true;
        this.grupoGestion.fechaFin = null;
        this.grupoGestion.fechaInicio = null;
    }

    validateGreater() {
        if (this.grupoGestion.fechaInicio != null && this.grupoGestion.fechaFin != null && this.grupoGestion.fechaInicio < this.grupoGestion.fechaFin) {
            this.isGreater = true;
        } else {
            this.isGreater = false;
        }
    }

    createGruposGestion() {
        this.gruposGestionService.updateGruposGestion(this.grupoGestion).then(data => {
            this.router.navigate(['gruposGestion'])
        });
    }

    validateCode() {
        this.codeExists = this.gruposGestion.filter(t => t.codigoGrupoGestion === this.grupoGestion.codigoGrupoGestion).length > 0;
    }

    inputCleanUp(value: string) {
        this.grupoGestion.codigoGrupoGestion = value.toUpperCase().replace(' ', '').trim();
    }

    goBack(): void {
        this.router.navigate(['gruposGestion']);
    }
}