import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient) { }

  apiEndpoint: string = 'https://jsonplaceholder.typicode.com';

  getContacts(): Observable<Contact[]> {
    const contacts = this.getContactsFromLocalStorage();
    if (contacts && contacts.length > 0) {
      return of(contacts);
    } else {
      return this.http.get<Contact[]>(`${this.apiEndpoint}/users`).pipe(
        tap(fetchedContacts => this.saveContactsToLocalStorage(fetchedContacts)),
        catchError(this.handleError<Contact[]>('getContacts', []))
      );
    }
  }

  getContactById(id: number): Observable<Contact | undefined> {
    const contacts = this.getContactsFromLocalStorage();
    const contact = contacts ? contacts.find(contact => contact.id === id) : undefined;
    return of(contact);
  }

  deleteContact(id: number): Observable<Contact[]> {
    let contacts = this.getContactsFromLocalStorage() || [];
    contacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    return of(contacts);
  }

  createNewContact(user: Contact): Observable<Contact[]> {
    let contacts = this.getContactsFromLocalStorage() || [];
    user.id = this.generateId(contacts);
    contacts.push(user);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    return of(contacts);
  }

  updateContact(contact: Contact): Observable<Contact> {
    let contacts = this.getContactsFromLocalStorage();
    if (contacts) {
      const index = contacts.findIndex(c => c.id === contact.id);
      if (index !== -1) {
        contacts[index] = { ...contacts[index], ...contact };
        this.saveContactsToLocalStorage(contacts);
      }
    }
    return of(contact);
  }

  searchContacts(query: string): Observable<Contact[]> {
    const contacts = this.getContactsFromLocalStorage();
    const filteredContacts = contacts ? contacts.filter(contact =>
      contact.name.toLowerCase().includes(query.toLowerCase())) : [];
    return of(filteredContacts);
  }

  private handleError<T>(_operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private getContactsFromLocalStorage(): Contact[] | null {
    if (this.isLocalStorageAvailable()) {
      const contacts = localStorage.getItem('contacts');
      return contacts ? JSON.parse(contacts) : null;
    }
    return null;
  }

  private saveContactsToLocalStorage(contacts: Contact[]): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      console.error('localStorage is not available.');
    }
  }

  private generateId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 1;
  }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

}
