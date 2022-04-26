import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/_models/product.model';
import { AuthenticationService } from 'src/app/_services';
import { ProductService } from 'src/app/_services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CommonService } from 'src/app/_services/common.service';

declare var $;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  title: any = '';
  products: any[] = [];
  product: any;
  loggedInUser: any;
  loggedInUserRole: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private notifierService: NotifierService,
    private changeReference: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private commonService: CommonService
  ) {
    this.loggedInUser = authenticationService.decodeUser();
    this.loggedInUserRole = authenticationService.decodeRole();
    this.getProducts();
  }

  @ViewChild(ProductFormComponent, { static: false }) productFormComponent: ProductFormComponent;

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-red layout-top-nav fixed';
  }

  updateProducts(products: any) {
    this.products = this.commonService.sortListByUpdatedDate(products);
  }

  getProducts() {
    this.productService.getProductsByUserId(this.loggedInUser.id).subscribe(data => {
      this.products = data;
      this.products = this.commonService.sortListByUpdatedDate(this.products);
    })
  }


  public deleteProduct(product: any) {
    this.productService.deleteProduct(product).subscribe((data: any) => {
      if (data.deleted) {
        $("#product-" + product.id).remove();
        this.products = this.products.filter((productObject: any) => {
          return (productObject.id !== product.id)
        });
        this.notifier.notify('error', 'Product deleted');
      } else {
        this.notifier.notify('error', 'Reffered data can not be deleted');
      }
    });
  }

  addProduct(): void {
    this.title = "Add Product";
    this.productFormComponent.addPreview();
  }
  editProduct(product: any): void {
    this.title = "Edit Product";
    this.product = product;
    this.productFormComponent.editPreview(this.product);
  }

  public toggleProduct(product: any) {
    product.status = (product.status == 'Active') ? 'Inactive' : 'Active';
    product.updatedDate = new Date();
    this.productService.updateProduct(product).subscribe((data: any) => {
      this.products = this.commonService.sortListByUpdatedDate(this.products);
      this.notifierService.notify(product.status == 'Active' ? "success" : "error", product.name + " is now " + product.status);
    });
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

  closeProductForm() {
    this.productFormComponent.nameUsed = false;
    $('#modal-product-form').modal("hide");
  }
}
