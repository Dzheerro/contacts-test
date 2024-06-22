import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient) { }

  apiEndpoint: string = 'https://jsonplaceholder.typicode.com';

  getContacts() {
    return this.http.get<Contact[]>(`${this.apiEndpoint}/users`);
  }

  getContactById(id: number) {
    return this.http.get<Contact[]>(`${this.apiEndpoint}/users/${id}`);
  }

  deleteContact(id: number): Observable<Contact[]> {
    return this.http.delete<Contact[]>(`${this.apiEndpoint}/users/${id}`);
  }

  createNewContact(user: Contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(`${this.apiEndpoint}/users`, user);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiEndpoint}/users/${contact.id}`, contact);
  }

  searchContacts(query: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiEndpoint}/users?name_like=${query}`);
  }

}
