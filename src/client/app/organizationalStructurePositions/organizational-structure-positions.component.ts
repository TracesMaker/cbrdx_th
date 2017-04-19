import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {OrganizationalStructure} from "../_models/organizationalStructure";
import {OrganizationalStructurePositions} from "../_models/organizationalStructurePositions";
import {Positions} from "../_models/positions";
import {ConfirmationService} from "primeng/components/common/api";
import {PositionsService} from "../_services/positions.service";
import {OrganizationalStructurePositionsServices} from "../_services/organizationalStructurePositions.service";
import {PersonPositionsServices} from "../_services/personPositions.service";
import {ContractTypesServices} from "../_services/contractTypes.service";

@Component({
   moduleId: module.id,
   selector: 'organizational-structure-positions',
   templateUrl: 'organizational-structure-positions.component.html',
   providers: [ConfirmationService]
})

export class OrganizationalStructurePositionsComponent implements OnInit {

   private editingPosition: boolean = false;
   private badPostion: boolean = false;
   private countSlots: number = 0;
   private countCost: number = 0;
   private area: OrganizationalStructure = new OrganizationalStructure();
   private osPosition: OrganizationalStructurePositions = new OrganizationalStructurePositions();
   private backUpOSPosition: OrganizationalStructurePositions = new OrganizationalStructurePositions();
   private osPositions: OrganizationalStructurePositions[] = [];
   private positionList: Positions[] = [];
   private selectedPosition : Positions = null;

   constructor(private positionsService: PositionsService,
               private ospService: OrganizationalStructurePositionsServices,
               private personPositionService: PersonPositionsServices,
               private contractTypesService: ContractTypesServices,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      //temporal
      this.area.idEstructuraOrganizacional = 7;
      //temporal

      this.ospService.getAllByOrganizacionalStructure(this.area.idEstructuraOrganizacional).subscribe(list => {this.osPositions = list; this.sumPositions()});
   }

   editPosition(osPosition: OrganizationalStructurePositions) {
      if (osPosition != null) {
         this.backUpOSPosition = osPosition;
         this.osPosition = osPosition;
         this.selectedPosition = new Positions();
         this.selectedPosition.idCargo = osPosition.idCargo;
         this.selectedPosition.cargo = osPosition.cargo;
      } else {
         this.osPosition = new OrganizationalStructurePositions();
         this.selectedPosition = null;
      }
      this.editingPosition = true;
   }

   delete(osPosition: OrganizationalStructurePositions) {

   }

   isRepeated(idCargo: number, idEstructuraOrganizacionalCargo: number): boolean {
      let repeated: boolean = false;
      this.osPositions.map(osp => {
         if(idCargo !== null && idCargo === osp.idCargo && idEstructuraOrganizacionalCargo !== osp.idEstructuraOrganizacionalCargo) {
            repeated = true;
         }
      });

      return repeated;
   }

   savePosition() {
      if (this.osPosition.idEstructuraOrganizacionalCargo !== undefined && this.osPosition.idEstructuraOrganizacionalCargo !== null) {
         this.ospService.update(this.osPosition).subscribe(data => {
            this.osPositions[this.osPositions.indexOf(this.backUpOSPosition)] = this.osPosition;
            this.osPositions.push(data);
            this.editingPosition = false;
            this.osPosition = new OrganizationalStructurePositions();
         });
      } else {
         this.osPosition.idEstructuraOrganizacional = this.area.idEstructuraOrganizacional;
         this.osPosition.indicadorHabilitado = true;
         this.ospService.add(this.osPosition).subscribe(data => {
            this.osPositions.push(this.osPosition);
            this.editingPosition = false;
         });
      }
   }

   positionSearch(event: any) {
      this.positionsService.getByWildCard(event.query).subscribe(list => this.positionList = list);
   }

   capturePosition(event: any) {
      if (!this.isRepeated(event.idCargo, this.osPosition.idEstructuraOrganizacionalCargo)) {
         this.osPosition.idCargo = event.idCargo;
         this.osPosition.cargo = event.cargo;
         this.osPosition.salario = event.salario;
         this.badPostion = false;
      } else {
         this.selectedPosition = null;
         this.badPostion = false;
      }
   }

   cancelEditingPosition() {
      if (this.backUpOSPosition != null) {
         //Verificar si es necesario reestablecer el objeto en la tabla
         // this.osPositions[this.osPositions.indexOf(this.backUpOSPosition)] = this.backUpOSPosition;
         this.backUpOSPosition = null;
      }
      this.editingPosition = false;
   }

   sumPositions(){
      this.countCost = 0;
      this.countSlots = 0;
      for (let position of this.osPositions){
         this.countCost = this.countCost + (position.salario * position.plazas);
         this.countSlots = this.countSlots + position.plazas;
      }
   }
}