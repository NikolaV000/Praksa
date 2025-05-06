import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router){}

  goToListPage() {
    this.router.navigate(['/list-page']);
  }


}
