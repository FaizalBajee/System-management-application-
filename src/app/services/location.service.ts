import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { locationModel } from "../models/location.model";
import { environment } from "src/environments/environment";
import { serverResponse } from "../models/server.response.Model";
@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor(private http: HttpClient) { }
    locationService(): Observable<serverResponse> {
        return this.http.get<serverResponse>(environment.BaseURL + "/location")
    }
}