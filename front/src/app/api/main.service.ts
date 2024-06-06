import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private servicesUrl = 'http://localhost:8084/api/articles';
  private servicesUrl1 = 'http://localhost:8086/api/media';
  private servicesUrl2 = 'http://localhost:8085/api/sites';
  private servicesUrl3 = 'http://localhost:8087/api/heritage';

  constructor(private http: HttpClient, private authService: AuthService) { } // Inject AuthService

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }
  publish(articleFormData:FormData){
    const headers = new HttpHeaders({ 
      'Authorization': ''+localStorage.getItem('token')
    });

    return this.http.post(`${this.servicesUrl}/add`, articleFormData, { headers });
  }


  getArticlesList(){
    const headers = new HttpHeaders({ 
      'Authorization': ''+localStorage.getItem('token')
    });

    return this.http.get(`${this.servicesUrl}/list`, { headers });
  }
  

  publishM(mediaFormData:FormData){
    const headers = new HttpHeaders({ 
      'Authorization': ''+localStorage.getItem('token')
    });

    return this.http.post(`${this.servicesUrl1}/add`, mediaFormData, { headers });
  }
  getMediaList(){
    const headers = new HttpHeaders({ 
      'Authorization': ''+localStorage.getItem('token')
    });

    return this.http.get(`${this.servicesUrl1}/list`, { headers });
  }
  addSite(formData: FormData): Observable<any> {
    return this.http.post(`${this.servicesUrl2}/add`, formData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getSiteList(): Observable<any> {
    return this.http.get(`${this.servicesUrl2}/list`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  siteSearch(): Observable<any> {
    return this.http.get(`${this.servicesUrl2}/search`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  publishMapping(mappFormData: FormData): Observable<any> {
    return this.http.post(`${this.servicesUrl3}/add`, mappFormData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getMappingList(): Observable<any> {
    return this.http.get(`${this.servicesUrl3}/list`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  searchMapping(name: string, location: string, keyword: string): Observable<any> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (location) params = params.set('location', location);
    if (keyword) params = params.set('keyword', keyword);

    return this.http.get(`${this.servicesUrl3}/search`, { headers: this.getHeaders(), params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
