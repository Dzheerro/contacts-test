import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionService } from '../../services/action.service';
import { Contact } from '../../models/contact';
import { error } from 'console';

@Component({
  selector: 'app-create-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-contact-form.component.html',
  styleUrl: './create-contact-form.component.scss'
})
export class CreateContactFormComponent {

  contactInfo: any;

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(8)]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    address: this.formBuilder.group({
      street: [''],
      suite: [''],
      city: [''],
      zipcode: [''],
      geo: this.formBuilder.group({
        lat: [''],
        lng: ['']
      })
    }),
    phone: [''],
    website: [''],
    company: this.formBuilder.group({
      name: [''],
      catchPhrase: [''],
      bs: ['']
    })
  });

  constructor(private formBuilder: FormBuilder, private actionService: ActionService) { }

  onSubmit() {
    if (this.form.valid) {
      this.contactInfo = this.form.value;
      this.actionService.createNewContact(this.contactInfo).subscribe( (response) => {
        console.log('Contact Created', response);
      },
        error => {
          console.log('Error', error)
        }
      )
    }
  }

}
