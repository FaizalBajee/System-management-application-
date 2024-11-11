import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerUserModel } from 'src/app/models/registerUser.model';
import { roleModel } from 'src/app/models/role.model';
import { RegisterUserService } from 'src/app/services/registerUser.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  registerForm!: FormGroup;
  role: roleModel[] = []
  constructor(private fb: FormBuilder, private roleService: RoleService, private registerUserService: RegisterUserService) {
    this.registerForm = this.fb.group({
      emp_id: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      is_active: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.roleService.roleService().subscribe(Response => {
      this.role = Response.content.roles;
    })
  }

  handleRegister() {
    if (this.registerForm.valid) {
      const payload: registerUserModel = {
        emp_id: this.registerForm.get('emp_id')?.value,
        name: this.registerForm.get('name')?.value,
        phone: this.registerForm.get('phone')?.value,
        role: this.registerForm.get('role')?.value,
        user_name: this.registerForm.get('user_name')?.value,
        password: this.registerForm.get('password')?.value,
        isActive: this.registerForm.get('is_active')?.value ? 1 : 0,
      }
      this.registerUserService.registerUserService(payload).subscribe(Response => {
        if (Response.success) {
          alert(Response.message)
          window.location.reload();
        }
      })
    }
  }

}
