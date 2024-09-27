import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export abstract class GenericApiService<R, T> {
  protected baseApiUrl: string = '';
  protected createUrl?: string;

  constructor(protected http: HttpClient) {}

  // Fetch all items, but delegate response processing to the child class
  getAll(): Observable<T[]> {
    return this.http.get<R>(this.baseApiUrl).pipe(
      map((response: R) => this.extractItems(response)), // Explicitly type the response as R
    );
  }

  // Fetch a single item by ID
  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseApiUrl}/${id}`);
  }

  // Create a new item
  create(item: Partial<T>): Observable<T> {
    const url = this.createUrl ? this.createUrl : this.baseApiUrl;
    return this.http.post<T>(url, item);
  }

  // Update an existing item by ID
  update(id: number, item: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.baseApiUrl}/${id}`, item);
  }

  // Delete an item by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/${id}`);
  }

  // Abstract method to extract items from the response
  protected abstract extractItems(response: R): T[];
}
