import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';

import { v4 as uuid4, validate } from 'uuid';

export const tokenLifeTime = 24 * 60 * 6;
const url = 'https://ngx-agora-sdk-ng.herokuapp.com/access_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public token = new Subject<string>();
  constructor(private httpClinet: HttpClient) { }

  getToken(channelName: string): void {
    this.httpClinet.get<string>(url, {
      params: {
        channel: channelName,
        // uid: uuid //TODO: UID does not work in token server the response token is not valid
      }
    }).pipe(
      retry(3),
      take(1),
      catchError(this.handleError)
    ).subscribe((token: any) => {
      this.token.next(token.token as string);
    });
  }

  getChannel(link: string): {channel?: string, error?: string} {
    const params = link.split('@');
    if (!validate(params[0]) || isNaN(parseInt(params[2], 10)) || isNaN(parseInt(params[3], 10))) {
      return {error: 'Your Link is not Valid!'};
    }
    if (Date.now() > ((+params[2]) + (+params[3])) * 1000) {
      return {error: 'Your Link is Expired!'};
    }

    return {channel: params[1]};
  }

  getLink(channelName: string): string {
    return `${uuid4()}@${channelName}@${tokenLifeTime}@${Math.floor(Date.now() / 1000)}`;
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
