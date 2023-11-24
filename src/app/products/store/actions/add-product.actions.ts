import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../models/product.model';

export const addProduct = createAction(
  '[Product Add] Add Product',
  props<{ product: IProduct }>()
);

export const addProductSuccess = createAction(
  '[Product Add] Add Product Success',
  props<{ product: IProduct }>()
);

export const addProductFailure = createAction(
  '[Product Add] Add Product Failure',
  props<{ error: any }>()
);
