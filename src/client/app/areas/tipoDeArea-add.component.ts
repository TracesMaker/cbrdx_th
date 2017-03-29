/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 28/02/2017.
 */

import {Component} from "@angular/core";
import {TipoDeArea} from "../_models/tipoDeArea";
import {TipoDeAreaService} from "../_services/tipoDeArea.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'tipoDeArea-add.component.html',
    selector: 'tipoDeAreas-add'
})
export class TipoDeAreaAddComponent {

    areas: TipoDeArea = new TipoDeArea();
    areasExistentes: TipoDeArea[];
    codeExists: boolean = false;

    constructor(private tipoDeAreasService: TipoDeAreaService, private router: Router) {
        tipoDeAreasService.listAreas().subscribe(res => {
            this.areasExistentes = res;
        });
    }

    createArea() {
        this.tipoDeAreasService.addArea(this.areas).then(data => {
            this.router.navigate(['tipoArea'])
        });
    }

    validateCode() {
        this.codeExists = this.areasExistentes.filter(t => t.codigoArea === this.areas.codigoArea).length > 0;
    }

    inputCleanUp(value: string) {
        this.areas.codigoArea= value.toUpperCase().replace(' ', '').trim();
    }

    goBack(): void {
        this.router.navigate(['tipoArea']);
    }
}