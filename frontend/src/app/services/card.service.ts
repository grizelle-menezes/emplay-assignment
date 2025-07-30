import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://127.0.0.1:8000/api/cards/';

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  updateCard(card: Card): Observable<any> {
    return this.http.put(`${this.apiUrl}update/${card.id}/`, { description: card.description });
  }

  addCard(card: { title: string, description: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}add/`, card);
  }

  deleteCard(cardId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}delete/${cardId}/`);
  }

}
