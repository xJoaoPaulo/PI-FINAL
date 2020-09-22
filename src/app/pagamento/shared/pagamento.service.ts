import { Observable } from 'rxjs';
import { DocumentoFiscal } from './pagamento.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  constructor(private http: HttpClient) { }

  private readonly API = 'api/adicionaNota';

  postNota(request: DocumentoFiscal): Observable<DocumentoFiscal> {
    return this.http.post<DocumentoFiscal>(this.API, request);
  }

}
