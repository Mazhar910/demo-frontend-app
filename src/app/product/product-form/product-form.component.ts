import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/_models/product.model';
import { UserService, AuthenticationService } from 'src/app/_services';
import { ProductService } from 'src/app/_services/product.service';
import { first } from 'rxjs/operators';
import { CommonService } from 'src/app/_services/common.service';

declare var $;
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() products: any[] = [];
  @Output() productsChange = new EventEmitter<any[]>();
  @Input() product: any;
  productForm: FormGroup;
  private readonly notifier: NotifierService;
  loggedInUserRole: any;;
  loggedInUser: any;
  nameUsed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notifierService: NotifierService,
    private changeReference: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private commonService: CommonService
  ) {
    this.productForm = this.formBuilder.group(new Product());
    this.loggedInUserRole = authenticationService.decodeRole();
    this.loggedInUser = this.authenticationService.decodeUser();
  }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-red layout-top-nav fixed';
  }

  addPreview() {
    this.productForm.controls['name'].enable();
    this.productForm = this.formBuilder.group(new Product());
    this.productForm.controls['user'].setValue(this.loggedInUser);
  }

  editPreview(product: any) {
    this.productForm.controls['name'].setValue(product.name);
    this.productForm.controls['id'].setValue(product.id);
    this.productForm.controls['uuid'].setValue(product.uuid);
    this.productForm.controls['name'].setValue(product.name);
    this.productForm.controls['state'].setValue(product.state);
    this.productForm.controls['status'].setValue(product.status);
    this.productForm.controls['createdDate'].setValue(new Date(product.createdDate));
    this.productForm.controls['updatedDate'].setValue(new Date(product.updatedDate));
    this.productForm.controls['price'].setValue(product.price);
    this.productForm.controls['quantity'].setValue(product.quantity);
    this.productForm.controls['user'].setValue(product.user);

  }

  get fields() {
    return this.productForm.controls;
  }

  onSubmit() {
    if (this.productForm.controls['id'].value != '') {
      this.productForm.controls["updatedDate"].setValue(new Date());
      this.productService.updateProduct(this.productForm.value).pipe(first()).subscribe(data => {
        this.products = this.products.map((productObject: any) => {
          return (productObject.id == data.id ? productObject = data : productObject)
        });
        this.productsChange.emit(this.products);
        this.notifierService.notify("success", "Product updated");
      });
    } else {
      this.productService.createProduct(this.productForm.value).subscribe(data => {
        this.products.push(data);
        this.productsChange.emit(this.products);
        this.notifierService.notify("success", "Product saved");
      });
    }
    this.productForm.reset({
      id: 0,
      status: "Active",
      state: true,
      createdDate: new Date(),
      updatedDate: new Date(),
      price: 0,
      quantity: 0
    });
    this.nameUsed = false;
    $('#modal-product-form').modal("hide");
  }


  ngOnDestroy(): void {
    document.body.className = "";
  }

}
