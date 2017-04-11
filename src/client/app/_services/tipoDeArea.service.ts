import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {TipoDeArea} from "../_models/tipoDeArea";
import "rxjs/add/operator/toPromise";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class TipoDeAreaService {

    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_TH_URL %>/api/estructuraAreas/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    listAreas() {
        return this.http.get(this.serviceURL,{headers: this.headers}).map((res: Response) => res.json() as TipoDeArea[]);
    }

    addArea(c: TipoDeArea): Promise<TipoDeArea> {
        return this.http.post(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().then(res => res.json() as TipoDeArea).catch(this.handleError);
    };

    updateArea(c: TipoDeArea): Promise<any> {
        return this.http.put(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewArea(id: number) {
        return this.http.get(this.serviceURL + id,{headers: this.headers}).map(res => res.json() as TipoDeArea);
    }
    getlistAreas() {
        return this.http.get(this.serviceURL + 'enabled',{headers: this.headers}).map((res: Response) => res.json() as TipoDeArea[]);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }
}
