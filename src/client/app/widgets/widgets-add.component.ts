import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService,Message} from 'primeng/primeng';
import {Widgets} from "../_models/widgets";
import {WidgetServices} from "../_services/widget.service";
import {Location}                 from '@angular/common';

@Component({
   moduleId: module.id,
   templateUrl: 'widgets-form.component.html',
   selector: 'widgets',
   providers: [ConfirmationService]
})
export class WidgetsAddComponent {

   widgets: Widgets = new Widgets();
   listWidgets: Widgets[];
   codExists: boolean=false;
   msgs:Message[]=[];


   constructor(private router: Router,
               private location:Location,
               private widgetServices: WidgetServices,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      this.widgetServices.getAll().subscribe(res => {
         this.listWidgets = res;
      });
   }
   onSubmit(){
      this.msgs=[];
      this.widgetServices.add(this.widgets).subscribe(data => {
         this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
         this.location.back();
      }, error => {
         this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
      });
   }
   inputCleanUp(value: string) {
      this.widgets.codigoWidget = value.toUpperCase().replace(' ', '').trim();
   }

   validateCode() {
      this.codExists = this.listWidgets.filter(t => t.codigoWidget === this.widgets.codigoWidget).length > 0;
   }
   capitalize(event:any) {
      let input = event.target.value;
      event.target.value = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
   }
   inputURL() {
      let url = this.widgets.descripcion;
      if (this.widgets.descripcion != null) {
         this.widgets.descripcion = url.replace(' ', '');
      }
   }
   goBack(): void {
      this.confirmationService.confirm({
         message: ` ¿Esta seguro que desea salir sin guardar?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',
         accept: () => {
            this.location.back();
         }
      });
   }

}