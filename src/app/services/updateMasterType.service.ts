import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { environment } from "src/environments/environment";
import { masterType } from "../models/masterType.model";
@Injectable({
    providedIn: 'root'
})
export class UpdateMasterTypeService {
    constructor(private http: HttpClient, private loginService: LoginService) { }
    updateMasterTypeService(payload: masterType): Observable<serverResponse> {
        const token = this.loginService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<serverResponse>(environment.BaseURL + "/updateMasterType", payload, { headers })
    }
}