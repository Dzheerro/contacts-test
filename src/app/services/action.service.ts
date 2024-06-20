import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient) { }

  apiEndpoint: string = 'https://jsonplaceholder.typicode.com';

  getContacts() {
    return this.http.get(`${this.apiEndpoint}/users`);
  }

  getContactById(id: number) {
    this.http.get(`${this.apiEndpoint}/users/${id}`);
  }

}
