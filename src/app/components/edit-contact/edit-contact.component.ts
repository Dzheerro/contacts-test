import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionService } from '../../services/action.service';

import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';


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
    this.route.params.subscribe(params => {
      this.contactId = +params['id'];
      this.loadContact(this.contactId);
      this.messageService.add({ severity: 'info', summary: 'Test Message', detail: 'This is a test message' });
    });

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        city: ['', Validators.required],
      }),
    });
  }

  loadContact(id: number) {
    this.actionService.getContactById(id).subscribe(contact => {
      this.contactForm.patchValue(contact);
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.actionService.updateContact({ id: this.contactId, ...this.contactForm.value }).subscribe(
        () => {
          this.message = 'Contact updated successfully.';
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.message });
          this.router.navigate(['/discover-contact']);
        },
        (error: any) => {
          console.error('Error updating contact:', error);
          this.message = 'Failed to update contact.';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
        }
      );
    } else {
      this.message = 'Form is invalid. Please check the fields.';
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: this.message });
    }
  }
  
}