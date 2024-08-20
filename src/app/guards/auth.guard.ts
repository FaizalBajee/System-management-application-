import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/login.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private route: Router, private loginService: LoginService) { }
    canActivate(): boolean {
        const token = this.loginService.getToken();
        if (!token || this.loginService.isTokenExpired()) {
            alert('Your session has expired. Please log in again.');
            this.route.navigate(['login-screen']);
            return false
        }
        return true
    }
};