import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { environment } from "src/environments/environment";
import { computerTypeModel } from "../models/computerType.model";
@Injectable({
    providedIn: 'root'
})
export class UpdateComputerTypeService {
    constructor(private http: HttpClient, private loginService: LoginService) { }
    updateComputerTypeService(payload: computerTypeModel): Observable<serverResponse> {
        const token = this.loginService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<serverResponse>(environment.BaseURL + "/updateComputerType", payload, { headers });
    }
}