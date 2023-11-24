import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { selectProductById } from '../../store/selectors/product.selectors';
import { updateProduct } from '../../store/actions/update-product.actions';
import { IProduct } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Form } from '../../../core/interfaces/forms/form.interface';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class ProductEditComponent implements OnInit {
  public productForm!: FormGroup<Form<Omit<IProduct, 'id'>>>;
  public submitted: boolean = false;
  public error: string = '';

  private product$!: Observable<IProduct | undefined>;
  private productId!: string | null;

  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    this.productForm = this.fb.nonNullable.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      producer: ['', [Validators.required]],
      price: [0, [Validators.required]],
      inStock: [0, [Validators.required]],
    });

    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.product$ = this.store.pipe(
        select(selectProductById(this.productId)),
      );

      this.product$.subscribe((product) => {
        if (product) {
          this.productForm.patchValue(product);
        }
      });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.submitted = true;
      this.error = '';

      this.store.dispatch(
        updateProduct({
          product: { ...this.productForm.getRawValue(), id: this.productId! },
        }),
      );

      this.router.navigate(['dashboard', 'list']);
    }
  }
}
