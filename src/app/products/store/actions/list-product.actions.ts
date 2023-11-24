import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../models/product.model';

export const fetchProductList = createAction(
  '[Product List] Fetch Product List',
);

export const fetchProductListSuccess = createAction(
  '[Product List] Fetch Product List Success',
  props<{ productList: IProduct[] }>(),
);

export const fetchProductListFailure = createAction(
  '[Product List] Fetch Product List Failure',
  props<{ error: Error }>(),
);
