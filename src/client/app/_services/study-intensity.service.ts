import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Intensity} from "../_models/intensity";

@Injectable()
export class StudyIntensityServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/listasIntensidades/';
  private detailService  = '<%= SVC_TH_URL %>/api/listasIntensidades/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAllEnabled()  {
    return this.http.get(this.masterService+'enabled/').map((res:Response) => res.json() as Intensity[]);
  }

}

