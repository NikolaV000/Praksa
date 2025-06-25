import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule, MatMenuModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit  {
  constructor(private authService: AuthService,private router: Router){}
  admins: { _id: string; username: string }[] = [];
  currentUserRole: string = '';
  ngOnInit(): void {
    const user = this.authService.currentUser; // assuming you store user info
    this.currentUserRole = user?.role || '';

    this.authService.getAllAdmins().subscribe({
      next: (data) => (this.admins = data),
      error: (err) => console.error('Failed to load admins:', err)
    });
  }

  goToProjectPage(adminId: string) {
    this.router.navigate([`${adminId}/project-page`]);
  }
  


}
