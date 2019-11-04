import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {Linha} from '../model/linha';
import { Itinerario } from '../model/itinerario';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'http://www.poatransporte.com.br/php/facades/process.php';

@Injectable({
  providedIn: 'root'
})
export class ApiOnibus {

  constructor(private http: HttpClient) { }

  getLinhas (): Observable<Linha[]> {

    const url = `${apiUrl}?a=nc&p=%25&t=o`;

    return this.http.get<Linha[]>(url)
      .pipe(
        tap(onibus => console.log('leu os ônibus')),
        catchError(this.handleError('getLinhasOnibus', []))
      );
  }

  getItinerario(id: string): Observable<Itinerario> {
    const url =  `${apiUrl}?a=il&p=${id}`;
    return this.http.get<Itinerario>(url).pipe(
      tap(_ => console.log(`leu o Itinerario id=${id}`)),
      catchError(this.handleError<Itinerario>(`getProduto id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
