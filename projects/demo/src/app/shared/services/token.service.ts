import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';

import { v4 as uuid4 } from 'uuid';

export const tokenLifeTime = 24 * 60 * 6;
const url = 'https://ngx-agora-sdk-ng.herokuapp.com/access_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public token = new Subject<string>();
  constructor(private httpClinet: HttpClient) { }

  getToken(channelName: string): void {
    const uuid = `${uuid4()}`; // @${channelName}@${tokenLifeTime}@${Date.now() / 1000}`;
    this.httpClinet.get<string>(url, {
      params: {
        channel: channelName,
        // uid: uuid
      }
    }).pipe(
      retry(3),
      take(1),
      catchError(this.handleError)
    ).subscribe((token) => {
      this.token.next(token as string);
    });
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
