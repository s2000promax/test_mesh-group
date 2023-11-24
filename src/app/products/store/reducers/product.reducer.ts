import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../models/product.model';
import {
  fetchProductListSuccess,
  fetchProductListFailure,
} from '../actions/list-product.actions';
import {
  addProductSuccess,
  addProductFailure,
} from '../actions/add-product.actions';
import {
  updateProductSuccess,
  updateProductFailure,
} from '../actions/update-product.actions';
import {
  deleteProductSuccess,
  deleteProductFailure,
} from '../actions/delete-product.actions';

export interface ProductState {
  productList: IProduct[];
  isLoading: boolean;
  error: any;
}

export const initialState: ProductState = {
  productList: [],
  isLoading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(fetchProductListSuccess, (state, { productList }) => ({
    ...state,
    productList,
  })),
  on(fetchProductListFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(addProductSuccess, (state, { product }) => ({
    ...state,
    productList: [...state.productList, product],
  })),
  on(addProductFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(updateProductSuccess, (state, { product }) => ({
    ...state,
    productList: state.productList.map((p) =>
      p.id === product.id ? product : p,
    ),
  })),
  on(updateProductFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(deleteProductSuccess, (state, { id }) => ({
    ...state,
    productList: state.productList.filter((p) => p.id !== id),
  })),
  on(deleteProductFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);
