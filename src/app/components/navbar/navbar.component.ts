import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../models/contact';

import { ActionService } from '../../services/action.service';

import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, InputTextModule, RippleModule, FormsModule, AutoCompleteModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private actionService: ActionService) { }

  items: MenuItem[] | undefined;
  searchQuery: string = '';
  filteredContacts: Contact[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.router.navigate([''])
      },
      {
        label: 'Add Contact',
        icon: 'pi pi-star',
        command: () => this.router.navigate(['create-contact'])
      },
    ];
  }

  onSearch(event: any) {
    const query = event.query;
    if (query.trim().length > 0) {
      this.actionService.searchContacts(query).subscribe((contacts) => {
        this.filteredContacts = contacts;
      });
    }
  }

  onContactSelect(event: any) {
    const selectedContact = event.value;
    this.router.navigate([`/discover-contact/${selectedContact.id}`]);
  }
}
