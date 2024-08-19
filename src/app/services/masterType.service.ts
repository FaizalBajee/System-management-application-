import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { serverResponse } from "../models/server.response.Model";

@Injectable({
    providedIn: 'root'
})
export class MasterTypeService {
    constructor(private http: HttpClient) { }

    MasterTypeService(): Observable<serverResponse> {
        return this.http.get<serverResponse>(environment.BaseURL + "/masterType")
    }
}