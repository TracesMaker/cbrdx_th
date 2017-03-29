/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
import {Component, OnInit} from "@angular/core";
import {CentroCostos} from "../_models/centroCostos";
import {CentroCostosService} from "../_services/centroCostos.service";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'centroCostos-edit.component.html',
    selector: 'gruposGestion-edit'
})
export class CentroCostosEditComponent {

    centroCostos: CentroCostos = new CentroCostos();
    centrosExistentes: CentroCostos[];
    codeExists: boolean = false;

    constructor(private centroCostosService: CentroCostosService, private router: Router, private route: ActivatedRoute) {
        route.params.switchMap((params: Params) => centroCostosService.viewCentroCostos(+params['id']))
            .subscribe(data => {
                this.centroCostos = data;
                centroCostosService.listCentroCostos().subscribe(res => {
                    this.centrosExistentes = res.filter(t => t.idCentroCostos != this.centroCostos.idCentroCostos);
                });
            });
    }

    createGruposGestion() {
        this.centroCostosService.updateCentroCostos(this.centroCostos).then(data => {
            this.router.navigate(['centroCostos'])
        });
    }

    validateCode() {
        this.codeExists = this.centrosExistentes.filter(t => t.codigoCentroCostos === this.centroCostos.codigoCentroCostos).length > 0;
    }

    inputCleanUp(value: string) {
        this.centroCostos.codigoCentroCostos = value.toUpperCase().replace(' ', '').trim();
    }

    goBack(): void {
        this.router.navigate(['centroCostos']);
    }
}