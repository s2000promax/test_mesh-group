import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import {
  fetchProductList,
  fetchProductListFailure,
  fetchProductListSuccess,
} from '../actions/list-product.actions';
import {
  addProduct,
  addProductFailure,
  addProductSuccess,
} from '../actions/add-product.actions';
import {
  updateProduct,
  updateProductFailure,
  updateProductSuccess,
} from '../actions/update-product.actions';
import {
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
} from '../actions/delete-product.actions';

@Injectable()
export class ProductEffects {
  private readonly actions$ = inject(Actions);
  private readonly productService = inject(ProductService);

  fetchProductList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProductList),
      mergeMap(() =>
        this.productService.getProductList().pipe(
          map((productList) => {
            console.log('effector', productList);
            return fetchProductListSuccess({ productList });
          }),
          catchError((error) => {
            console.log('effector_Error', error);
            return of(fetchProductListFailure({ error }));
          }),
        ),
      ),
    ),
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      mergeMap((action) =>
        this.productService.addProduct(action.product).pipe(
          map((product) => addProductSuccess({ product })),
          catchError((error) => of(addProductFailure({ error }))),
        ),
      ),
    ),
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      mergeMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((product) => updateProductSuccess({ product })),
          catchError((error) => of(updateProductFailure({ error }))),
        ),
      ),
    ),
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap((action) =>
        this.productService.deleteProduct(action.id).pipe(
          map(() => deleteProductSuccess({ id: action.id })),
          catchError((error) => of(deleteProductFailure({ error }))),
        ),
      ),
    ),
  );
}
