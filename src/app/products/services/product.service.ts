import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:4200/products';
  private readonly http = inject(HttpClient);

  getProductList() {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  addProduct(product: IProduct) {
    return this.http.post<IProduct>(this.apiUrl, product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
