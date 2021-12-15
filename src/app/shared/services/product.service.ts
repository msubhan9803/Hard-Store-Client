import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';
import { EnvironmentUrlService } from './enviroment-url.service';
import { Router } from '@angular/router';

const state = {
  products: JSON.parse(localStorage['products'] || '[]'),
  wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
  compare: JSON.parse(localStorage['compareItems'] || '[]'),
  cart: JSON.parse(localStorage['cartItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected _env: EnvironmentUrlService;
  protected http: HttpClient;
  httpHeaders: any;
  public storageSub = new Subject<string>();
  public storageSubObs: Observable<any>

  constructor(
    private router: Router,
    injector: Injector,
    private toastrService: ToastrService
  ) {
    this.http = injector.get(HttpClient);
    this._env = injector.get(EnvironmentUrlService);
    this.storageSubObs = this.storageSub.asObservable();

    // Setting Up token to be passed with request
    // const token = localStorage.getItem('userToken');
    // const SecutiryGroupId = localStorage.getItem("securityGroup");
    // this.httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`,
    //   'GroupId': `${SecutiryGroupId}`
    // });
  }

  public Currency = { name: 'AED', currency: 'AED', price: 1 } // Default Currency
  public OpenCart: boolean = false;
  public Products;

  // get api url
  public getImageUrl() {
    return this._env.imageAddress;
  }

  /*
    ---------------------------------------------
    --------------- API Product  -------------------
    ---------------------------------------------
  */

  // GET: category/getProducts
  public getAllProductsAPI() {
    let url = this._env.urlAddress + 'product/GetProducts';
    // this.toastrService.success('Product get request .');
    return this.http.get(url);
  }

  // GET: products/getReviews
  public getReviewsByProductId(productId) {
    let url = this._env.urlAddress + 'products/getReviews/' + productId;
    // this.toastrService.success('Product get request .');
    return this.http.get(url);
  }

  // GET: category/getProductById
  public getProductById(productId) {
    let url = this._env.urlAddress + 'product/GetProductById/' + productId;
    return this.http.get(url);
  }

  // GET: products/getCategories
  public getCategories() {
    let url = this._env.urlAddress + 'product/getCategories';
    return this.http.get(url);
  }

  // GET: category/averageRating
  public averageRating(productId) {
    let url = this._env.urlAddress + 'products/averageRating/' + productId;
    return this.http.get(url);
  }

  // POST: product/writeReview
  public writeReview(payload) {
    let url = this._env.urlAddress + 'products/writeReview';
    // this.toastrService.success('Product get request .');
    return this.http.post(url, payload);
  }

  // Product
  private get products(): Observable<Product[]> {
    // this.Products = this.http.get<Product[]>('assets/data/products.json').pipe(map(data => data));
    this.Products.subscribe(next => { localStorage['products'] = JSON.stringify(next) });
    return this.Products = this.Products.pipe(startWith(JSON.parse(localStorage['products'] || '[]')));
  }

  // Get Products
  public get getProducts(): Observable<Product[]> {
    return this.products;
  }

  // Get Products By Slug
  public getProductBySlug(slug: string): Observable<Product> {
    return this.products.pipe(map(items => {
      return items.find((item: any) => {
        return item.title.replace(' ', '-') === slug;
      });
    }));
  }


  /*
    ---------------------------------------------
    ---------------  Wish List  -----------------
    ---------------------------------------------
  */

  // Get Wishlist Items
  public get wishlistItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.wishlist);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Wishlist
  public addToWishlist(product): any {
    const wishlistItem = state.wishlist.find(item => item.id === product.id)
    if (!wishlistItem) {
      state.wishlist.push({
        ...product
      })
    }
    this.toastrService.success('Product has been added in wishlist.');
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  // Remove Wishlist items
  public removeWishlistItem(product: Product): any {
    const index = state.wishlist.indexOf(product);
    state.wishlist.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  /*
    ---------------------------------------------
    -------------  Compare Product  -------------
    ---------------------------------------------
  */

  // Get Compare Items
  public get compareItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.compare);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Compare
  public addToCompare(product): any {
    console.log("product: ", product)
    const compareItem = state.compare.find(item => item._id === product._id)
    if (!compareItem) {
      state.compare.push({
        ...product
      })
    }
    console.log("compareItems: ", compareItem)
    this.toastrService.success('Product has been added in compare.');
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  // Remove Compare items
  public removeCompareItem(product: Product): any {
    const index = state.compare.indexOf(product);
    state.compare.splice(index, 1);
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  /*
    ---------------------------------------------
    -----------------  Cart  --------------------
    ---------------------------------------------
  */

  // Get Cart Items
  public get cartItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.cart);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Cart
  public addToCart(product, quantity?): any {
    const alreadyProduct = state.cart.find(item => item._id === product._id);

    if (alreadyProduct) {
      alreadyProduct.quantity = alreadyProduct.quantity + quantity;
      state.cart.forEach((item, index) => {
        if (item._id === alreadyProduct._id) {
          state.cart[index] = alreadyProduct;
        }
      })
    } else {
      const qty = quantity;
      state.cart.push({
        ...product,
        quantity: qty
      })
    }

    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    this.toastrService.success('Product added to cart');
    this.storageSub.next('localStorageChanged');

    return true;
  }

  public storageSubInstance() {
    return this.storageSubObs;
  }

  // Update Cart Quantity
  public updateCartQuantity(product: Product, arrayIndex: number, quantity: number): Product | boolean {
    return state.cart.find((items, index) => {
      if (arrayIndex == index) {
        const qty = state.cart[index].quantity + quantity
        const stock = this.calculateStockCounts(state.cart[index], quantity)
        if (qty !== 0 && stock) {
          state.cart[index].quantity = qty
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        this.storageSub.next('localStorageChanged');
        return true
      }
    })
  }

  // Calculate Stock Counts
  public calculateStockCounts(product, quantity) {
    const qty = product.quantity + quantity
    const stock = product.stock
    if (stock < qty || stock == 0) {
      this.toastrService.error('You can not add more items than available. In stock ' + stock + ' items.');
      return false
    }
    return true
  }

  // Remove Cart items
  public removeCartItem(index: number): any {
    console.log(`Delete product at Index ${index}`)
    state.cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    this.storageSub.next('localStorageChanged');
    return true
  }

  // Total amount 
  public cartTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map((product: Product[]) => {
      return product.reduce((prev, curr: Product) => {
        let price = curr.sale ? (curr?.price - curr?.discount) : curr.price;
        // if (curr.discount) {
        //   price = curr.skuArray[0].price - (curr.skuArray[0].price * curr.discount / 100)
        // }
        return (prev + price * curr.quantity) * this.Currency.price;
      }, 0);
    }));
  }

  /*
    ---------------------------------------------
    ------------  Filter Product  ---------------
    ---------------------------------------------
  */

  // Get Product Filter
  public filterProducts(filter: any): Observable<Product[]> {
    return this.products.pipe(map(product =>
      product.filter((item: Product) => {
        if (!filter.length) return true
        const Tags = filter.some((prev) => { // Match Tags
          if (item.tags) {
            if (item.tags.includes(prev)) {
              return prev
            }
          }
        })
        return Tags
      })
    ));
  }

  // Sorting Filter
  public sortProducts(products: Product[], payload: string): any {

    if (payload === 'ascending') {
      return products.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'a-z') {
      return products.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'z-a') {
      return products.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        } else if (a.title < b.title) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'low') {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'high') {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        }
        return 0;
      })
    }
  }

  /*
    ---------------------------------------------
    ------------- Product Pagination  -----------
    ---------------------------------------------
  */
  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 8) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }


  public emptyCartAndProducts() {
    this.Products = [];
    state.cart = [];
    localStorage.setItem("cartItems", JSON.stringify([]));
    this.storageSub.next('localStorageChanged');
  }

  // GET: products/getFaqsByType
  public getFaqsByType(type) {
    let url = this._env.urlAddress + 'products/getFaqsByType/' + type;
    return this.http.get(url);
  }

  // GET: products/getFaqsByType
  public searchFaq(searchValue) {
    let url = this._env.urlAddress + 'products/searchFaq';
    let params = new HttpParams({
      fromObject: {
        question: searchValue
      }
    })
    return this.http.get(url, { params: params });
  }
}
