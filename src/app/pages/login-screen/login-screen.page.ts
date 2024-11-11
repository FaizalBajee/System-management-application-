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
  showUserForm: boolean = false

  constructor(private fb: FormBuilder, private route: Router, private loginService: LoginService, private roleService: RoleService) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      role: ['']
    })
  }
  ngOnInit(): void {
    this.roleService.roleService().subscribe(Response => {
      this.role = Response.content.roles;
    })
  }

  onRoleChange(event: any) {
    this.showUserForm = event.detail.value === 'USER'
  }

  signIn() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.user, this.loginForm.value.password).subscribe(Response => {
        if (!Response.success) return alert(Response.message)
        this.route.navigate(['/main-page']);
      })
    }
  }
}
