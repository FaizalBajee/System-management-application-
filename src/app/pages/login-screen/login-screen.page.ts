import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { roleModel } from 'src/app/models/role.model';
import { LoginService } from 'src/app/services/login.service';
import { RoleService } from 'src/app/services/role.service';
@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
})
export class LoginScreenPage implements OnInit {
  loginForm!: FormGroup;
  role: roleModel[] = []

  constructor(private fb: FormBuilder, private route: Router, private loginService: LoginService, private roleService: RoleService) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.roleService.roleService().subscribe(Response => {
      this.role = Response.content.roles;
    })
  }
  signIn() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.user, this.loginForm.value.password).subscribe(Response => {
        if (!Response.success) return alert("invalid user")
        const userRole = this.loginForm.value.role;
        const userName = this.loginForm.value.name;
        const userPassword = this.loginForm.value.password;
        const accessToken = Response.content.accessToken;
        this.route.navigate(['main-page']);

      })
    }
  }
}
