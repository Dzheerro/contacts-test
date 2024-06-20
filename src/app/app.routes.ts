import { Routes } from '@angular/router';
import { DiscoverComponent } from './components/discover/discover.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [

    { path: 'discover-contact', component: DiscoverComponent},
    { path: 'discover-contact/:id', component: ContactComponent},

    { path: '', redirectTo: '/discover-contact', pathMatch: 'full'},
    { path: '**', redirectTo: '/discover-contact'}

];
