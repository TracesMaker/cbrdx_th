import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { EmployeesLocation } from './employees-location';
import { SelectItem, ConfirmationService, Message } from 'primeng/primeng';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare let google: any;
import { NavService } from '../_services/_nav.service';

@Component({
  moduleId: module.id,
  selector: 'add-location',
  templateUrl: 'location-form.component.html',
  providers: [ConfirmationService]
})

export class LocationUpdateComponent implements OnInit {

  @Input()
  employLocation: EmployeesLocation = new EmployeesLocation();
  header: string = 'Editando Ubicación';

  principalNomenclatureList: any;
  complementaryNomenclatureList: any;
  addressTypeList: any;

  selectedPrincipalNomenclature: SelectItem[] = [];
  labelPrincipalNomenclature: string;
  copyAutocomplete: string;

  principalNomenclature: string;
  numberOne: string;
  numberTwo: string;

  complementaries: any;
  finalAddress: string;
  cityList: any;
  hoodList: any;
  map: any;
  idTercero: any;

  submitted: boolean;
  msgs: Message[] = [];

  constructor(
    private locationService: LocationService,
    private router: Router,
    private location: Location,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private _nav: NavService
  ) {
    this.complementaries = [{ tipo: null, detalle: '' }];
    this.employLocation.ciudad = { value: null, label: '' };
    this.employLocation.barrio = { value: null, label: '' };
    this.employLocation.tipoDireccion = { value: null, label: '' };
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
      this.locationService.get(params['id']).subscribe(employLocation => {
        this.idTercero = params['tercero'];
        this.employLocation = employLocation;
        this.finalAddress = this.employLocation.direccion;
        this.copyAutocomplete = this.employLocation.ciudad.label;
        var mapProp = {
          center: new google.maps.LatLng(this.employLocation.latitud, this.employLocation.longitud),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var latLng = new google.maps.LatLng(this.employLocation.latitud, this.employLocation.longitud);
        this.map = new google.maps.Map(document.getElementById('ubicacionColaborador'), mapProp);
        var marker = new google.maps.Marker({ position: latLng, map: this.map });
      });
    });
  }

  onSubmit(value: string) {
    if (this.copyAutocomplete != this.employLocation.ciudad.label) {
      this.employLocation.ciudad = { value: null, label: '' };
    } else {
      this.submitted = true;
      this.msgs = [];
      this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Guardando' });

      this.employLocation.direccion = this.finalAddress;

      let tercero: any = {
        idTercero: this.idTercero,
        auditoriaFecha: '',
        auditoriaUsuario: 1,
        idLocalizacion: this.employLocation.idUbicacion,
        localizacion: this.employLocation
      };

      this.locationService.update(tercero)
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

  hoodSearch(event: any) {
    this.locationService.getAllHoods(event.query).subscribe(
      hoods => this.hoodList = hoods
    );
  }  

  captureId(event: any) {
    this.employLocation.ciudad.value = event.idDivisionPolitica;
    this.employLocation.ciudad.label = event.descripcionDivisionPolitica;
    this.copyAutocomplete = event.descripcionDivisionPolitica;
    this.composeAddress();
  }

  captureHoodId(event: any) {
    this.employLocation.barrio.value = event.idDivisionPolitica;
    this.employLocation.barrio.label = event.descripcionDivisionPolitica;
  }

  capturePrincipalNomenclature(event: any) {
    this.labelPrincipalNomenclature = event.originalEvent.srcElement.innerText.trim();
    this.composeAddress();
  }

  captureTipoDireccion(event: any) {
    this.employLocation.tipoDireccion.value = event.value;
    this.employLocation.tipoDireccion.label = event.originalEvent.srcElement.innerText.trim();
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

            var latLng = new google.maps.LatLng(latitude, longitude);
            var mapOptions = {
              center: latLng,
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById('ubicacionColaborador'), mapOptions);
            var marker = new google.maps.Marker({ position: latLng, map: map });

            assingLocation(latitude, longitude);
          } else {
            console.log('Error : ' + status);
          }
        });

    }


    for (var c of this.complementaries) {
      if (c.tipo !== null) {
        this.finalAddress += ' ' + c.tipo + ' ' + c.detalle + ' ';
      }
    }
    this.employLocation.direccion = this.finalAddress;

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
        this._nav.setTab(2);
        //this.router.navigate(['/employees-location']);
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
