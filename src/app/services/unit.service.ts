import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { unitModel } from "../models/unit.model";
import { environment } from "src/environments/environment";
import { serverResponse } from "../models/server.response.Model";

@Injectable({
    providedIn: 'root'
})
export class UnitService {
    constructor(private http: HttpClient) { }

    unitService(): Observable<serverResponse> {
        return this.http.get<serverResponse>(environment.BaseURL + "/unit")
    }
}