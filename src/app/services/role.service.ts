import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { roleModel } from "../models/role.model";
import { serverResponse } from "../models/server.response.Model";
import { LoginService } from "./login.service";
@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private http: HttpClient, private loginService: LoginService) { }
    roleService(): Observable<serverResponse> {
        const token = this.loginService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<serverResponse>(environment.BaseURL + "/role", { headers });
    }
}