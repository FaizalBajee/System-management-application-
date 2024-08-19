import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ComplaintMasterService {
    constructor(private http: HttpClient) { }
    complaintMasterService(): Observable<serverResponse> {
        return this.http.get<serverResponse>(environment.BaseURL + "/getComplaintMaster")
    }
}