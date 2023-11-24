import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.productList,
);

export const selectProductById = (productId: string) =>
  createSelector(selectProductState, (state: ProductState) =>
    state.productList.find((product) => product.id === productId),
  );

export const selectProductLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.isLoading,
);

export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState) => state.error,
);
