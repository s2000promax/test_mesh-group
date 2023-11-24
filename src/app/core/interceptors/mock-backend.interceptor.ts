import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  private _productsJsonPath = 'assets/mock-data/products.json';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;

    if (url.endsWith('/products') && method === 'GET') {
      req = req.clone({
        url: this._productsJsonPath,
      });
      return next.handle(req).pipe(delay(500));
    }

    if (url.endsWith('/products') && method === 'POST') {
      const { body } = req.clone();
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }

    if (url.match(/\/products\/.*/) && method === 'PUT') {
      const { body } = req.clone();
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }

    if (url.match(/\/products\/.*/) && method === 'DELETE') {
      const empId = this.getEmployeeId(url);
      return of(new HttpResponse({ status: 200, body: empId })).pipe(
        delay(500),
      );
    }

    return next.handle(req);
  }

  getEmployeeId(url: any) {
    const urlValues = url.split('/');
    return urlValues[urlValues.length - 1];
  }
}
