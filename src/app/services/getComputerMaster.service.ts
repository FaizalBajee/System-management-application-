import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { environment } from "src/environments/environment";
import { LoginService } from "./login.service";
@Injectable({
    providedIn: 'root'
})
export class GetComputerMasterService {
    constructor(private http: HttpClient, private loginService: LoginService) { }
    getComputerMasterService(): Observable<serverResponse> {
        const token = this.loginService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        return this.http.get<serverResponse>(environment.BaseURL + "/getComputerMaster", { headers })
    }
}