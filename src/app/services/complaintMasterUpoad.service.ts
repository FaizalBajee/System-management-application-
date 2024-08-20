import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { environment } from "src/environments/environment";
import { ComplaintMasterModel } from "../models/complaintMaster.model";
import { LoginService } from "./login.service";
@Injectable({
    providedIn: 'root'
})
export class ComplaintMasterUploadService {
    constructor(private http: HttpClient, private loginService: LoginService) { }
    complaintMasterUploadService(payload: ComplaintMasterModel): Observable<serverResponse> {
        const token = this.loginService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        return this.http.post<serverResponse>(environment.BaseURL + "/uploadComplaintMaster", payload, { headers })
    }
}