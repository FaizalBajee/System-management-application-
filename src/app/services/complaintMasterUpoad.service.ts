import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { environment } from "src/environments/environment";
import { ComplaintMasterModel } from "../models/complaintMaster.model";
@Injectable({
    providedIn: 'root'
})
export class ComplaintMasterUploadService {
    constructor(private http: HttpClient) { }
    complaintMasterUploadService(payload: ComplaintMasterModel): Observable<serverResponse> {
        return this.http.post<serverResponse>(environment.BaseURL + "/uploadComplaintMaster", payload)
    }
}