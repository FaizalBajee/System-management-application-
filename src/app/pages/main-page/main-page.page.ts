import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleMasterType() {
    this.router.navigate(['master-type'])
  }
  handleAddItem() {
    this.router.navigate(['master'])
  }
  handleCreateUser() {
    this.router.navigate(['add-user'])
  }
  handleLogout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.router.navigate(['login-screen']);
  }

}
