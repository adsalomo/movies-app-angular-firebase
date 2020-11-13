import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get(`${environment.urlApiMovie}movie`);
  }

  save(movie: any) {
    return this.http.post(`${environment.urlApiMovie}movie/create`, movie);
  }

  delete(id: number) {
    return this.http.delete(`${environment.urlApiMovie}movie/delete/${id}`);
  }
}
