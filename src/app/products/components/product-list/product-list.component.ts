import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../../store/selectors/product.selectors';
import { fetchProductList } from '../../store/actions/list-product.actions';
import { RouterLink } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { deleteProduct } from '../../store/actions/delete-product.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, NgForOf],
})
export class ProductListComponent implements OnInit {
  products$!: Observable<IProduct[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.products$ = this.store.select(selectAllProducts);
  }

  onDelete(id: string) {
    this.store.dispatch(deleteProduct({ id }));
  }
}
