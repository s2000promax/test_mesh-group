import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { addProduct } from '../../store/actions/add-product.actions';
import { v4 as uuidv4 } from 'uuid';
import { Router, RouterLink } from '@angular/router';
import { Form } from '../../../core/interfaces/forms/form.interface';
import { IProduct } from '../../models/product.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
})
export class ProductCreateComponent implements OnInit {
  public productForm!: FormGroup<Form<Omit<IProduct, 'id'>>>;
  public submitted: boolean = false;
  public error: string = '';

  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  ngOnInit() {
    this.productForm = this.fb.nonNullable.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      producer: ['', [Validators.required]],
      price: [0, [Validators.required]],
      inStock: [0, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.submitted = true;
      this.error = '';

      this.store.dispatch(
        addProduct({
          product: {
            ...this.productForm.getRawValue(),
            id: uuidv4(),
          },
        }),
      );

      this.productForm.reset();
      this.router.navigate(['dashboard', 'list']);
    }
  }
}
