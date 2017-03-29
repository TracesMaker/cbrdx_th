import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import { TiposPersonas }            from '../_models/tiposPersonas';

@Injectable()
export class ListEmployeesService {

  public headers = new Headers({'Content-Type': 'application/json'});

  private serviceURL = '<%= SVC_TH_URL %>/api/';

  constructor(private http: Http,
              private authenticationService: AuthenticationService
  ) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getListPersonTypes()  {
    return this.http.get(this.serviceURL+"tiposPersonas/",{headers: this.headers}).map((res:Response) => res.json() as TiposPersonas[]);
  }

  getDocumentTypes()  {
    return this.http.get(this.serviceURL+"tiposDocumentos/",{headers: this.headers}).map((res:Response) => res.json());
  }
  
  getGenderTypes()  {
    return this.http.get(this.serviceURL+"generos/",{headers: this.headers}).map((res:Response) => res.json());
  }
  
  getMaritalStatusTypes()  {
    return this.http.get(this.serviceURL+"estadosCiviles/",{headers: this.headers}).map((res:Response) => res.json());
  }
  
  getRhRactorTypes()  {
    return this.http.get(this.serviceURL+"factorRh/",{headers: this.headers}).map((res:Response) => res.json());
  }
  
  getHealthTypes()  {
    return this.http.get(this.serviceURL+"coberturasSalud/",{headers: this.headers}).map((res:Response) => res.json());
  }
  
  getOccupationsTypes()  {
    return this.http.get(this.serviceURL+"tiposOcupaciones/",{headers: this.headers}).map((res:Response) => res.json());
  }
  
  getAcademicLevelTypes()  {
    return this.http.get(this.serviceURL+"nivelesEstudios/",{headers: this.headers}).map((res:Response) => res.json());
  }
  
  getAffiliationTypes()  {
    return this.http.get(this.serviceURL+"tiposAfiliacion/",{headers: this.headers}).map((res:Response) => res.json());
  }
  
  handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }

}
