import { Routes } from '@angular/router';
import { DiscoverComponent } from './components/discover/discover.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateContactFormComponent } from './components/create-contact-form/create-contact-form.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';

export const routes: Routes = [

    { path: 'discover-contact', component: DiscoverComponent},
    { path: 'discover-contact/:id', component: ContactComponent},
    { path: 'create-contact', component: CreateContactFormComponent},
    { path: 'edit-contact/:id', component: EditContactComponent },
    { path: '', redirectTo: '/discover-contact', pathMatch: 'full'},
    { path: '**', redirectTo: '/discover-contact'}

];
