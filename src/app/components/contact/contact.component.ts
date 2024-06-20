import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ActionService } from '../../services/action.service';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private actionService: ActionService) { }

  contact$!: Observable<any>;
  
  ngOnInit(): void {
    this.contact$ = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        const contactId = +params['id'];
        return this.actionService.getContactById(contactId);
      })
    );
  }

}
