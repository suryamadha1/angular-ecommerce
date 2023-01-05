import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../common/product";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProductCategory } from "../common/product-category";


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    
    private baseUrl = 'http://localhost:8080/api/product';
    private categoryUrl = 'http://localhost:8080/api/product-category';

    constructor(private httpClient: HttpClient) {

    }

    getProductList(theCategoryId: number): Observable<Product[]> {

        const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

        return this.getProducts(searchUrl);
    }

    searchProducts(theKeyword: string) {
        const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
        return this.getProducts(searchUrl);
    }

    searchProductsPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProducts> {
        const searchUrl = `${this.baseUrl}/search/findByNameContaining`+`?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;
        return this.httpClient.get<GetResponseProducts>(searchUrl);
    }

    private getProducts(searchUrl: string) {
        return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
            map(response => response._embedded.products)
        );
    }

    getProduct(theProductId: number): Observable<Product> {
        const productUrl = `${this.baseUrl}/${theProductId}`;
        return this.httpClient.get<Product>(productUrl);
      }

    getProductCategories(): Observable<ProductCategory[]> {
        return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
            map(response => response._embedded.productCategory)
        );
    }

    getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {
        const url = `${this.baseUrl}/search/findByCategoryId`+`?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
        return this.httpClient.get<GetResponseProducts>(url);
    }

}

interface GetResponseProducts {
    _embedded: {
        products: Product[]
    },
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    }
}

interface GetResponseProductCategory {
    _embedded: {
        productCategory: ProductCategory[]
    }
}