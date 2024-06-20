import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionService } from '../../services/action.service';

// PrimeNG Imports

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterLink],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss'
})
export class DiscoverComponent {

  constructor(private actionService: ActionService, private router: Router) { }

  contacts$ = this.actionService.getContacts(); 
  
  redirect(id: number) {
    this.router.navigate([`/discover-contact/${id}`]);
  }
  
}
