import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { environment } from "src/environments/environment";
import { registerUserModel } from "../models/registerUser.model";
import { LoginService } from "./login.service";
@Injectable({
    providedIn: 'root'
})
export class RegisterUserService {
    constructor(private http: HttpClient, private loginService: LoginService) { }
    registerUserService(payload: registerUserModel): Observable<serverResponse> {
        const token = this.loginService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<serverResponse>(environment.BaseURL + "/registerUser", payload, { headers })
    }
}