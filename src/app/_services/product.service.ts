import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  endpoint = environment.APIEndpoint;
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<any>(this.endpoint + "/products");
  }
  getProductsByUserId(userId: any) {
    return this.http.get<any>(this.endpoint + "/products/" + userId);
  }
  getProductById(id: any) {
    return this.http.get<any>(this.endpoint + "/product/" + id);
  }
  getProductByUuid(uuid: any) {
    return this.http.get<any>(this.endpoint + "/product/uuid/" + uuid);
  }
  getProductByName(name: any) {
    return this.http.get<any>(this.endpoint + "/product-by-name/" + name);
  }
  createProduct(product: any) {
    return this.http.post(this.endpoint + "/product", product);
  }
  updateProduct(product: any) {
    return this.http.put<any>(this.endpoint + "/product/" + product.id, product);
  }
  deleteProduct(product: any) {
    return this.http.delete<any>(this.endpoint + "/product/" + product.id);
  }
  updateState(locker: any) {
    return this.http.put<any>(this.endpoint + "/locker/state/" + locker.id, locker);
  }
  getLockerByLockerTypeIdAndLocationId(lockerTypeId: any, locationId: any) {
    return this.http.get<any>(this.endpoint + "/lockers/lockerType/" + lockerTypeId + "/" + locationId);
  }
  checkLockerName(lockerName: any, lockerTypeId: any, locationId) {
    return this.http.get<any>(this.endpoint + "/lockers/check-locker-name/" + lockerName + "/" + lockerTypeId + "/" + locationId);
  }
}
