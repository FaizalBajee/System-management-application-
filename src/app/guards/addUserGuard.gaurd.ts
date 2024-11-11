import { Injectable } from "@angular/core";
import { LoginService } from "../services/login.service";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
@Injectable({
    providedIn: 'root'
})
export class AddUserGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) { }
    canActivate(): boolean {
        const role = this.loginService.getUserRole();
        if (role === 'ADMIN' || role === 'MANAGER') {
            return true;
        }
        alert('you do not have access to this page')
        return false;
    }

}