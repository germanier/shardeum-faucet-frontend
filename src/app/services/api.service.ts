import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  readonly ROOT_URL = 'https://shardeum-faucet.onrender.com/sendSHM?address=';

  dripFaucet(address: string): Observable<any> {
    return this.http.post(this.ROOT_URL + address, {}).pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
}
