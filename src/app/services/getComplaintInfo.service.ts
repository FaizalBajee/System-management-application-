import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { environment } from "src/environments/environment";
import { LoginService } from "./login.service";
@Injectable({
    providedIn: 'root'
})
export class GetComplaintInfoService {
    constructor(private http: HttpClient, private loginService: LoginService) { }
    getComplaintInfo(masterType: string, unit?: string, location?: string): Observable<serverResponse> {
        const token = this.loginService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        let params = new HttpParams().set('masterType', masterType);
        if (unit) {
            params = params.set('unit', unit);
        }
        if (location) {
            params = params.set('location', location);
        }
        return this.http.get<serverResponse>(environment.BaseURL + `/getComplaintInfo`, { headers, params })
    }
}