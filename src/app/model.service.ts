import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { NewUser } from './new-user';

@Injectable()
export class ModelService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: Http) { }

  createUser(newUser: NewUser): Promise<void> {
    console.log('creating new user!', newUser);
    const requestBody = {
      data: {
        type: 'users',
        attributes: {
          username: newUser.username,
          email: newUser.email,
          password: newUser.password
        }
      }
    };

    const headers = new Headers({ 'Content-Type': 'application/vnd.api+json' });

    return this.http
      .post(`${this.baseUrl}/users`, JSON.stringify(requestBody), { headers })
      .toPromise()
      .then((response) => {
        console.log('responded!', response);
      });
  }

  /**
   * @TODO this function is hugely imperfect. we don't know how to work with Observables catch etc
   *
   *
   */
  isUsernameAvailable(username: string): Observable<boolean> {
    console.log('searching for availability of', username);

    const headers = new Headers({ 'Content-Type': 'application/vnd.api+json' });

    return this.http
      .get(`${this.baseUrl}/users/${username}`, { headers })
      .map((resp: Response) => {
        if (resp.status === 200) { return false; }
      })
      .catch((err, observable): Observable<boolean> => {
        if (err.status === 404) { return new Observable(observer => observer.next(true)); }
      });
  }

  verifyEmail(username: string, code: string): Promise<string> {
    const requestBody = {
      data: {
        type: 'users',
        id: username,
        attributes: {
          username: username,
          code: code
        }
      }
    };

    const headers = new Headers({ 'Content-Type': 'application/vnd.api+json' });

    return this.http
      .get(`${this.baseUrl}/users/${username}/account/email/verify/${code}`, { headers })
      .toPromise()
      .then((response) => {
        console.log('responded!', response);
        return 'some-email';
      });
  }


  basicAuth({ username, password }: { username: string, password: string }): Promise<any> {
    // generate an Authorization header
    const authHeader = 'Basic ' + new Buffer(`${username}:${password}`).toString('base64');

    const headers = new Headers({
      'Content-Type': 'application/vnd.api+json',
      'Authorization': authHeader
    });

    return this.http
      .get(`${this.baseUrl}/auth/basic`, { headers })
      .toPromise()
      .then((response: Response) => {
        console.log('responded!', response);
        return response.json().data.attributes;
      });
  }

}
