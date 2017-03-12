import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LocationService } from './location.service';
import { EmployeesLocation } from './employees-location';
import { SelectItem, ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare let google: any;
import { NavService } from '../_services/_nav.service';

@Component({
  moduleId: module.id,
  selector: 'add-location',
  templateUrl: 'location-form.component.html',
  providers: [ConfirmationService]
})

export class LocationAddComponent implements OnInit {

  @Input()
  employLocation: EmployeesLocation = new EmployeesLocation();
  header = 'Agregando Ubicación';

  principalNomenclatureList: any;
  complementaryNomenclatureList: any;
  addressTypeList: any;

  //selectedTipoDireccion: SelectItem[] = [];
  selectedPrincipalNomenclature: SelectItem[] = [];
  labelPrincipalNomenclature: string;
  //selectedCity: any[] = [{value: null, label : ''}];
  copyAutocomplete: string;

  principalNomenclature: string;
  numberOne: string;
  numberTwo: string;

  complementaries: any;
  finalAddress: string;
  cityList: any;
  map: any;

  submitted: boolean;
  msgs: Message[] = [];

  constructor(
    private locationService: LocationService,
    private location: Location,
    private confirmationService: ConfirmationService,
    private _nav: NavService,
    private route: ActivatedRoute
  ) {
    this.complementaries = [{ tipo: null, detalle: '' }];
    this.employLocation.tipoDireccion.value
  }

  ngOnInit() {


    this.locationService.getPrincipalNomenclatureList().subscribe(
      principalNomenclatureList => this.principalNomenclatureList = principalNomenclatureList
    );
    this.locationService.getComplementaryNomenclatureList().subscribe(
      complementaryNomenclatureList => this.complementaryNomenclatureList = complementaryNomenclatureList
    );
    this.locationService.getAddressTypeList().subscribe(
      addressTypeList => this.addressTypeList = addressTypeList
    );

    this.route.params.subscribe((params: Params) => {
      this.employLocation.colaborador = params['id'];
    });
  }

  onSubmit() {
    if (this.copyAutocomplete != this.employLocation.ciudad.label) {
      this.employLocation.ciudad = { value: null, label: '' };
    } else {
      this.submitted = true;
      this.msgs = [];
      this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Guardando' });

      this.employLocation.direccion = this.finalAddress;

      let terceroLocalizacion = {
        idTercero: this.employLocation.colaborador,
        idLocalizacion: '',
        auditoriaFecha: new Date(),
        auditoriaUsuario: 1,
        localizacion: {
          idUbicacion: '',
          direccion: this.employLocation.direccion,
          auditoriaUsuario: 1,
          auditoriaFecha: new Date(),
          idDivisionPolitica: this.employLocation.ciudad.value,
          longitud: this.employLocation.longitud,
          latitud: this.employLocation.latitud,
          comoLlegar: this.employLocation.comoLlegar,
          barrio: {
            value: '',
            label: this.employLocation.barrio
          },
          ciudad: this.employLocation.ciudad,
          departamento: this.employLocation.departamento,
          pais: this.employLocation.pais,
          tipoDireccion: this.employLocation.tipoDireccion
        }
      }

      console.log(terceroLocalizacion);
      this.locationService.add(terceroLocalizacion)
        .subscribe(
        data => {
          this._nav.setTab(2);
          this.location.back();
        });
    }
  }

  citySearch(event: any) {
    this.locationService.getAllCities(event.query).subscribe(
      cities => this.cityList = cities
    );
  }

  captureId(event: any) {
    this.employLocation.ciudad.value = event.idDivisionPolitica;
    this.employLocation.ciudad.label = event.descripcionDivisionPolitica;
    this.copyAutocomplete = event.descripcionDivisionPolitica;
    this.composeAddress();
  }

  capturePrincipalNomenclature(event: any) {
    this.labelPrincipalNomenclature = event.originalEvent.srcElement.innerText.trim();
    this.composeAddress();
  }

  composeAddress(): void {

    this.finalAddress = '';
    this.finalAddress += this.labelPrincipalNomenclature === undefined ? '' : this.labelPrincipalNomenclature + ' ';
    this.finalAddress += this.principalNomenclature === undefined ? '' : this.principalNomenclature + ' # ';
    this.finalAddress += this.numberOne === undefined ? '' : this.numberOne + ' - ';
    this.finalAddress += this.numberTwo === undefined ? '' : this.numberTwo + ' ';

    if (this.finalAddress !== '' && this.employLocation.ciudad.label !== '' && this.employLocation.ciudad.label !== undefined) {
      //console.log(this.finalAddress + ' ' + this.employLocation.ciudad.label);
      let geocoder = new google.maps.Geocoder();

      const assingLocation = (l: any, t: any) => {
        this.employLocation.latitud = l;
        this.employLocation.longitud = t;
      };
      geocoder.geocode({ 'address': this.finalAddress + ' ' + this.employLocation.ciudad.label },
        function (results: any, status: any) {
          if (status === google.maps.GeocoderStatus.OK) {
            let latitude = results[0].geometry.location.lat();
            let longitude = results[0].geometry.location.lng();

            let latLng = new google.maps.LatLng(latitude, longitude);
            let mapOptions = {
              center: latLng,
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            let map = new google.maps.Map(document.getElementById('ubicacionColaborador'), mapOptions);
            let marker = new google.maps.Marker({ position: latLng, map: map });

            assingLocation(latitude, longitude);
          } else {
            console.log('Error : ' + status);
          }
        });

    }


    for (let c of this.complementaries) {
      if (c.tipo !== null) {
        this.finalAddress += ' ' + c.tipo + ' ' + c.detalle + ' ';
      }
    }

  }
  addComplementary(): void {
    let complementary = { 'tipo': 0, 'detalle': '' };
    this.complementaries.push(complementary);
  }

  removeComplementary(id: any): void {
    //console.log(id);
    this.complementaries.splice(id, 1);
  }

  goBack(): void {
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea Cancelar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        //this.router.navigate(['/employees-family-information']);
        this._nav.setTab(2);
        this.location.back();
      },
      reject: () => {
      }
    });
  }

  focusUP() {
    const element = document.querySelector("#formulario");
    if (element) { element.scrollIntoView(element); }
  }
}
