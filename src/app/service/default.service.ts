import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Course } from '../models/course';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class DefaultService{

  url = 'http://localhost:8000/api/'; // api rest fake


  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos itens
  get(nameMolel?: string): Observable<any> {
    return this.httpClient.get(this.url + nameMolel)
      .pipe()
  }

  // Obtem item pelo id
  getById(id: any, nameMolel: string = ''): Observable<any> {
    console.log('fghj')
    return this.httpClient.get(this.url + nameMolel + '/' + id)
      .pipe()
  }

  // salva um carro
  save(data: any, nameMolel: string = ''): Observable<any> {
    return this.httpClient.post(this.url + nameMolel, data)
      .pipe()
  }

  // utualiza um carro
  update(data: any, id: any, nameMolel: string = ''): Observable<any> {
    console.log(nameMolel)
    return this.httpClient.post(this.url + nameMolel + '/update/' + id, JSON.stringify(data), this.httpOptions)
      .pipe()
  }

  // deleta um item
  delete(id: any, nameModel: string = '') {
    return this.httpClient.post(this.url + nameModel + '/delete/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
