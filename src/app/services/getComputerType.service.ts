import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
})
export class GetComputerTypeService {
    constructor(private http: HttpClient, private loginService: LoginService) { }
    getComputerTypeService(): Observable<serverResponse> {
        const token = this.loginService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<serverResponse>(environment.BaseURL + "/getComputerType", { headers });
    }
}