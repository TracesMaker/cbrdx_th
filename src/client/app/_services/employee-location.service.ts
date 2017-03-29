import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { EmployeesLocation } from '../_models/employee-location';
import { Employee } from "../_models/employees";

@Injectable()
export class LocationService {

  private serviceURL = '<%= SVC_TH_URL %>';

  constructor(private http: Http) {
  }

  getAllByEmployee(id: number) {
    return this.http.get(this.serviceURL + '/employeesLocations/employees/' + id)
      .map((res: Response) => res.json());
  }

  getPrincipalNomenclatureList() {
    return this.http.get(this.serviceURL + '/nomenclatures/principal')
      .map((res: Response) => res.json());
  }

  getComplementaryNomenclatureList() {
    return this.http.get(this.serviceURL + '/nomenclatures/complementary')
      .map((res: Response) => res.json());
  }

  getAddressTypeList() {
    return this.http.get(this.serviceURL + '/nomenclatures/addressType')
      .map((res: Response) => res.json());
  }

  add(f: any) {
    return this.http.post(this.serviceURL + '/employeesLocations', f)
      .map((res: Response) => res.json());
  };

  update(f: any) {
    return this.http.put(this.serviceURL + '/employeesLocations/', f)
      .map((res: Response) => res);
  }

  get(id: number) {
    return this.http.get(this.serviceURL + '/employeesLocations/location/' + id)
      .map((res: Response) => res.json());
  }

  delete(f: any) {
    return this.http.put(this.serviceURL + '/employeesLocations/', f)
      .map((res: Response) => res);
  }
}