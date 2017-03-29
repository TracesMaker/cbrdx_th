import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {FormalStudies} from './formal-studies';
import {AcademicEducationService} from '../_services/academic-education.service';
import {ConfirmationService} from 'primeng/primeng';
import {Employee} from "../_models/employees";


@Component({
  moduleId: module.id,
  templateUrl: 'formal-studies.component.html',
  selector: 'academic-education-formal',
  providers: [ConfirmationService]
})
export class FormalStudiesComponent {

  @Input() employee: Employee;

  fstudy: FormalStudies = new FormalStudies();
  dialogObjet: FormalStudies = new FormalStudies();
  fstudies: FormalStudies[];

  constructor(private academicEducationService: AcademicEducationService,
              private router: Router,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.academicEducationService.getAllFormalByEmployee(this.employee.idTercero).subscribe(
      fstudies => this.fstudies = fstudies
    );
  }

  delete(f: FormalStudies) {
    this.dialogObjet = f;
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que lo desea eliminar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.dialogObjet.indicadorHabilitado = false;
        this.academicEducationService.updateFormal(this.dialogObjet).subscribe(x => {
          this.fstudies.splice(this.fstudies.indexOf(this.dialogObjet), 1);
          this.dialogObjet = null;
        });
      },
      reject: () => {
        this.dialogObjet = null;
      }
    });
  }

  detail(f: FormalStudies) {
    this.router.navigate(['employees-formal-studies/detail/' + f.idTerceroEstudioFormal]);
  }

  add() {
    this.router.navigate(['employees-formal-studies/add/' + this.employee.idTercero]);
  }

  update(f: FormalStudies) {
    this.router.navigate(['employees-formal-studies/update/' + f.idTerceroEstudioFormal + '/' + this.employee.idTercero]);
  }
}
