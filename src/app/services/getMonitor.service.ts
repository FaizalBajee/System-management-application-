import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { environment } from "src/environments/environment";
import { LoginService } from "./login.service";
@Injectable({
    providedIn: 'root'
})
export class GetMonitorService {
    constructor(private http: HttpClient, private loginservice: LoginService) { }
    getMonitorService(): Observable<serverResponse> {
        const token = this.loginservice.getToken();
        const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
        return this.http.get<serverResponse>(environment.BaseURL + "/getComputerMaster", { headers });
    }
}