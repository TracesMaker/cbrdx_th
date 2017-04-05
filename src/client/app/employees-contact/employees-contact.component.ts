import "rxjs/add/operator/switchMap";
import {Component, Input} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {Employee} from "../_models/employees";
import {SelectItem, Message} from "primeng/primeng";
import {EmployeesService} from "../_services/employees.service";
import {ListEmployeesService} from "../_services/lists-employees.service";
import {NavService} from "../_services/_nav.service";

@Component({
  moduleId: module.id,
  selector: 'employees-contact',
  templateUrl: 'employees-contact.component.html',
  providers: []
})

export class EmployeesContactComponent {
  @Input() employee:Employee;

  msgs: Message[] = [];

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private listEmployeesService: ListEmployeesService,
              private _nav: NavService) {


  }

  ngOnInit() {
   
  }

  onSubmit() {
    this.msgs = [];
    this.employeesService.update(this.employee)
      .subscribe(data => {
        this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
      }, error => {
        this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
      });

  }

  /*getimc(): void {
    if (this.employee.peso != null && this.employee.talla != null) {
      if (!isNaN(this.employee.peso) && !isNaN(this.employee.talla)) {
        var imc = (this.employee.peso / Math.pow((this.employee.talla / 100), 2));
        this.employee.imc = Number(imc.toFixed(2));
      }
    }
  }

  inputNumberPeso() {
    var peso = this.employee.peso+"";
    if (this.employee.peso != null) {
       this.employee.peso = Number(peso.replace(/[^0-9]/g, ''));
    }
  }

  inputNumber() {
    var size = this.employee.talla+"";
    if (this.employee.talla != null) {
      this.employee.talla = Number(size.replace(/[^0-9]/g, ''));
    }
  }*/

}