import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';

import { ActionService } from '../../services/action.service';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact',
  standalone: true,
  providers: [MessageService],
  imports: [CommonModule, CardModule, ButtonModule, MessagesModule, ToastModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private actionService: ActionService,
    private messageService: MessageService,
    private router: Router
  ) { }

  contact$!: Observable<Contact | undefined>;
  contactId!: number;
  message: string = '';

  ngOnInit(): void {
    this.contact$ = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        this.contactId = +params['id'];
        return this.actionService.getContactById(this.contactId);
      })
    );
  }

  deleteContact(id: number) {
    this.actionService.deleteContact(id).subscribe(
      (response: Contact[]) => {
        const contactExists = response.some(contact => contact.id === id);
        if (!contactExists) {
          this.message = 'Contact was deleted from Local Storage. Local Storage will be updated when you are redirected to the Home Page.';
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.message });
          setTimeout(() => {
            this.router.navigate(['/discover-contact']);
          }, 6000);
        } else {
          this.message = 'Failed to delete contact.';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
        }
      },
      (error: any) => {
        console.error('Error:', error);
        this.message = 'An error occurred while trying to delete the contact.';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
      }
    );
  }
}