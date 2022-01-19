import { BaseResourceModel } from '../models/base-resource.model';

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(protected apiPath: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http
      .get(this.apiPath + '?user_id=lara_correa')
      .pipe(catchError(this.handleError), map(this.jsonDataToResources));
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}` + '?user_id=lara_correa';

    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToResource));
  }

  create(resource: T): Observable<T> {
    resource.user_id = 'lara_correa';
    resource.id = Math.ceil(Math.random() * 100).toString();

    return this.http
      .post(this.apiPath + '?user_id=lara_correa', resource)
      .pipe(catchError(this.handleError), map(this.jsonDataToResource));
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}`;

    return this.http.put(url, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}` + '?user_id=lara_correa&id=' + `${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // PROTECTED METHODS

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach((element: any) => resources.push(element as T));
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return jsonData as T;
  }

  protected handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }
}
