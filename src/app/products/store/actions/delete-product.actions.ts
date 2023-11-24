import { createAction, props } from '@ngrx/store';

export const deleteProduct = createAction(
  '[Product Delete] Delete Product',
  props<{ id: string }>(),
);

export const deleteProductSuccess = createAction(
  '[Product Delete] Delete Product Success',
  props<{ id: string }>(),
);

export const deleteProductFailure = createAction(
  '[Product Delete] Delete Product Failure',
  props<{ error: any }>(),
);
