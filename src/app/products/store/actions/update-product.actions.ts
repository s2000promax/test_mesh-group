import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../models/product.model';

export const updateProduct = createAction(
  '[Product Edit] Update Product',
  props<{ product: IProduct }>()
);

export const updateProductSuccess = createAction(
  '[Product Edit] Update Product Success',
  props<{ product: IProduct }>()
);

export const updateProductFailure = createAction(
  '[Product Edit] Update Product Failure',
  props<{ error: any }>()
);
