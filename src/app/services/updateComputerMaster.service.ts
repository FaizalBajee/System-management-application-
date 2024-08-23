import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { computerMasterModel } from "../models/computerMaster.model";
import { environment } from "src/environments/environment";
import { LoginService } from "./login.service";
import { serverResponse } from "../models/server.response.Model";
@Injectable({
    providedIn: 'root'
})
export class UpdateComputerMasterService {
    constructor(private http: HttpClient, private loginService: LoginService) { }
    updateComputerMasterService(payload:computerMasterModel): Observable<serverResponse> {
        const token = this.loginService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<serverResponse>(environment.BaseURL + "/uploadComputerMaster", payload, { headers })
    }
}