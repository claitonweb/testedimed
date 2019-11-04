import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {Linha} from '../model/linha';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%25&t=l';

@Injectable({
  providedIn: 'root'
})
export class ApiLotacao {

  constructor(private http: HttpClient) { }

  getLinhas (): Observable<Linha[]> {
    return this.http.get<Linha[]>(apiUrl)
      .pipe(
        tap(produtos => console.log('leu as lotações')),
        catchError(this.handleError('getLinhas', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
