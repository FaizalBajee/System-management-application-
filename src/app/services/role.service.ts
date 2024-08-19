import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { roleModel } from "../models/role.model";
import { serverResponse } from "../models/server.response.Model";
@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private http: HttpClient) { }
    roleService(): Observable<serverResponse> {
        return this.http.get<serverResponse>(environment.BaseURL + "/role")
    }
}