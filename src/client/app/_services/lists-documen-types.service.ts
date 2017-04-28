import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class ReferencesTypesService {

  public headers = new Headers({'Content-Type': 'application/json'});

  private serviceURL = '<%= SVC_TH_URL %>/listasTiposDocumentos/';

  constructor(private http: Http,
              private authenticationService: AuthenticationService
  ) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAll()  {
    return this.http.get(this.serviceURL,{headers: this.headers}).map((res:Response) => res.json());
  }

}
