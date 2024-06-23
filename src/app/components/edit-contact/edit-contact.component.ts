import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionService } from '../../services/action.service';

import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Contact } from '../../models/contact';


@Component({
  selector: 'app-edit-contact',
  standalone: true,
  providers: [MessageService],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MessagesModule, ToastModule, ButtonModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})

export class EditContactComponent implements OnInit {
  contactForm!: FormGroup;
  contactId!: number;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private actionService: ActionService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        city: ['', Validators.required],
      }),
    });

    this.route.params.subscribe(params => {
      this.contactId = +params['id'];
      this.loadContact(this.contactId);
    });
  }

  loadContact(id: number) {
    this.actionService.getContactById(id).subscribe(
      (contact: Contact | undefined) => {
        if (contact) {
          this.contactForm.patchValue({
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            address: {
              city: contact.address?.city
            }
          });
        }
      }
    );
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const updatedContact = { id: this.contactId, ...this.contactForm.value };
      console.log('Updated Contact:', updatedContact);
      this.actionService.updateContact(updatedContact).subscribe(() => {
        this.router.navigate(['/discover-contact']);
      },
        (error: any) => {
          console.error('Error updating contact:', error);
        }
      );
    }
  }
}