import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) { }
    login(user: any, pass: any): Observable<serverResponse> {
        return this.http.get<serverResponse>(environment.BaseURL + `/login?user=${user}&pass=${pass}`)
    }
}