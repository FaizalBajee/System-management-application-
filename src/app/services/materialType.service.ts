import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { materialTypeModel } from "../models/materialType.model";
import { environment } from "src/environments/environment";
import { serverResponse } from "../models/server.response.Model";

@Injectable({
    providedIn: 'root'
})
export class MaterialTypeService {
    constructor(private http: HttpClient) { }
    materialType(): Observable<serverResponse> {
        return this.http.get<serverResponse>(environment.BaseURL + "/materialType")
    }
}