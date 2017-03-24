import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";

@Injectable()
export class ReferencesTypesService {

  public headers = new Headers({'Content-Type': 'application/json'});

  private masterService = '<%= SVC_TH_URL %>/referenceTypes/';
  private detailService  = '<%= SVC_TH_URL %>/referenceTypes/';

  constructor(private http: Http,
              private authenticationService: AuthenticationService
  ) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAll()  {
    return this.http.get(this.masterService,{headers: this.headers}).map((res:Response) => res.json());
  }

}

