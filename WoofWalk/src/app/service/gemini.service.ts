import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private url = 'http://localhost:8082/api/ia/preguntar';

  constructor(private http: HttpClient) {}

  preguntar(mensaje: string) {
    return this.http.post(this.url, { mensaje });
  }
}
