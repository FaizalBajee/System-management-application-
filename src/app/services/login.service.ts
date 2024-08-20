import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { serverResponse } from "../models/server.response.Model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private jwtHelper = new JwtHelperService();
    constructor(private http: HttpClient, private route: Router) { }
    login(user: any, pass: any): Observable<serverResponse> {
        return this.http.get<serverResponse>(environment.BaseURL + `/login?user=${user}&pass=${pass}`).pipe(
            tap((Response) => {
                this.storeToken(Response.content.accessToken);
            })
        )
    }
    storeToken(token: string) {
        localStorage.setItem('token', token);
    }
    getToken(): string | null {
        return localStorage.getItem('token');
    }
    isTokenExpired(): boolean {
        const token = this.getToken();
        return token ? this.jwtHelper.isTokenExpired(token) : true;
    }
    logout(): void {
        localStorage.removeItem('token');
        this.route.navigate(['login-screen']);
    }
    isAuthenticated(): boolean {
        return !this.isTokenExpired;
    }
}