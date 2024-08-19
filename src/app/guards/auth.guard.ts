import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private route: Router) { }
    canActivate(): boolean {
        const JWT = localStorage.getItem('token')
        if (!JWT) {
            this.route.navigate(['login-screen']);
            return false
        }
        return true
    }
};