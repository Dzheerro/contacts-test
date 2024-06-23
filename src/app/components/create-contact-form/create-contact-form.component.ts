import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionService } from '../../services/action.service';
import { Router } from '@angular/router';

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
    phone: ['', Validators.required, Validators.maxLength(10)],
    website: [''],
    company: this.formBuilder.group({
      name: [''],
      catchPhrase: [''],
      bs: ['']
    })
  });

  constructor(private formBuilder: FormBuilder, private actionService: ActionService, private router: Router) { }

  onSubmit() {
    if (this.form.valid) {
      this.contactInfo = this.form.value;
      this.actionService.createNewContact(this.contactInfo).subscribe( (response) => {
        this.router.navigate(['/discover-contact']);
        console.log('Contact Created', response);
      },
        error => {
          console.log('Error', error)
        }
      )
    }
  }

}
