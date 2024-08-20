import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { locationModel } from "../models/location.model";
import { environment } from "src/environments/environment";
import { serverResponse } from "../models/server.response.Model";
import { LoginService } from "./login.service";
@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor(private http: HttpClient, private loginService: LoginService) { }
    locationService(): Observable<serverResponse> {
        const token = this.loginService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<serverResponse>(environment.BaseURL + "/location", { headers });
    }
}