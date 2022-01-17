import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';
import { EnvironmentUrlService } from './enviroment-url.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

const state = {
  products: JSON.parse(localStorage['hrdtkr_products'] || '[]'),
  wishlist: JSON.parse(localStorage['hrdtkr_wishlistItems'] || '[]'),
  compare: JSON.parse(localStorage['hrdtkr_compareItems'] || '[]'),
  cart: JSON.parse(localStorage['hrdtkr_cartItems'] || '[]')
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
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
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

  public resetFilterLocalStorage() {
    localStorage.setItem("hrdtkr_minPrice_filter", JSON.stringify(0));
    localStorage.setItem("hrdtkr_maxPrice_filter", JSON.stringify(1000));
    localStorage.setItem("hrdtkr_product_title", JSON.stringify(""));
    localStorage.setItem("hrdtkr_collections_filter", JSON.stringify([]));
    localStorage.setItem("hrdtkr_categories", JSON.stringify([]));
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

  // GET: category/getProducts
  public getProductBySlugApi(slug) {
    let url = this._env.urlAddress + 'product/getProductBySlug/' + slug;
    return this.http.get(url);
  }

  // GET: product/FilterProducts
  public getFilterProductsAPI(payload) {
    let url = this._env.urlAddress + 'product/FilterProducts';
    // this.toastrService.success('Product get request .');
    return this.http.post(url, payload);
  }

  // GET: products/getReviews
  public getReviewsByProductId(productId) {
    let url = this._env.urlAddress + 'product/getReviews/' + productId;
    // this.toastrService.success('Product get request .');
    return this.http.get(url);
  }

  // GET: category/getProductById
  public getProductById(productId) {
    let url = this._env.urlAddress + 'product/GetProductById/' + productId;
    return this.http.get(url);
  }

  // GET: product/getProductsBYCategory
  public getProductsBYCategory(categoryId) {
    let url = this._env.urlAddress + 'product/getProductsBYCategory/' + categoryId;

    return this.http.get(url);
  }

  // GET: products/getCategories
  public getCategories() {
    let url = this._env.urlAddress + 'product/getCategories';
    return this.http.get(url);
  }

  // GET: category/averageRating
  public averageRating(productId) {
    let url = this._env.urlAddress + 'product/averageRating/' + productId;
    return this.http.get(url);
  }

  // POST: product/writeReview
  public writeReview(payload) {
    let url = this._env.urlAddress + 'product/writeReview';
    // this.toastrService.success('Product get request .');
    return this.http.post(url, payload);
  }

  // Product
  private get products(): Observable<Product[]> {
    // this.Products = this.http.get<Product[]>('assets/data/products.json').pipe(map(data => data));
    this.Products.subscribe(next => { localStorage['hrdtkr_products'] = JSON.stringify(next) });
    return this.Products = this.Products.pipe(startWith(JSON.parse(localStorage['hrdtkr_products'] || '[]')));
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
    localStorage.setItem("hrdtkr_wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  // Remove Wishlist items
  public removeWishlistItem(product: Product): any {
    const index = state.wishlist.indexOf(product);
    state.wishlist.splice(index, 1);
    localStorage.setItem("hrdtkr_wishlistItems", JSON.stringify(state.wishlist));
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
    localStorage.setItem("hrdtkr_compareItems", JSON.stringify(state.compare));
    return true
  }

  // Remove Compare items
  public removeCompareItem(product: Product): any {
    const index = state.compare.indexOf(product);
    state.compare.splice(index, 1);
    localStorage.setItem("hrdtkr_compareItems", JSON.stringify(state.compare));
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

    localStorage.setItem("hrdtkr_cartItems", JSON.stringify(state.cart));
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

        localStorage.setItem("hrdtkr_cartItems", JSON.stringify(state.cart));
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
    localStorage.setItem("hrdtkr_cartItems", JSON.stringify(state.cart));
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
    localStorage.setItem("hrdtkr_cartItems", JSON.stringify([]));
    this.storageSub.next('localStorageChanged');
  }

  // GET: products/getFaqsByType
  public getFaqsByType(type) {
    let url = this._env.urlAddress + 'products/getFaqsByType/' + type;
    return this.http.get(url);
  }

  // GET: faq/getFaq
  public getFaq() {
    let url = this._env.urlAddress + 'faq/getFaq';
    return this.http.get(url);
  }

  // GET: products/getFaqsByType
  public searchFaq(searchValue) {
    console.log("searchValue: ", searchValue)
    let url = this._env.urlAddress + 'faq/searchFaq';
    let payload = {
      question: searchValue
    }
    return this.http.post(url, payload);
  }

  public setFilterCategories(categories) {
    let localStorageCategories = JSON.parse(localStorage.getItem("hrdtkr_categories"))?.length > 0 ?
      JSON.parse(localStorage.getItem("hrdtkr_categories")) : [];

    this.storageSub.next('localStorageChanged');

    if (!localStorageCategories.includes(categories)) {
      localStorageCategories.push(categories)
    }
    localStorage.setItem("hrdtkr_categories", JSON.stringify(localStorageCategories));
  }

  public getFilterCategories() {
    return localStorage.getItem("hrdtkr_categories");
  }

  public clearFilterCategories() {
    localStorage.setItem("hrdtkr_categories", JSON.stringify([]));
  }

  public updateFilterCategory(category) {
    let temp = JSON.parse(localStorage.getItem("hrdtkr_categories"))?.length > 0 ?
      JSON.parse(localStorage.getItem("hrdtkr_categories")) : [];

    if (temp.includes(category)) {
      temp = temp.filter(cat => cat !== category);
    } else {
      temp.push(category)
    }

    localStorage.setItem("hrdtkr_categories", JSON.stringify(temp));
    this.storageSub.next('localStorageChanged');
  }

  public getFilterCollection() {
    return localStorage.getItem("hrdtkr_collections_filter");
  }

  public clearFilterCollection() {
    localStorage.setItem("hrdtkr_collections_filter", JSON.stringify([]));
  }

  public updateFilterCollection(collection) {
    let temp = JSON.parse(localStorage.getItem("hrdtkr_collections_filter"))?.length > 0 ?
      JSON.parse(localStorage.getItem("hrdtkr_collections_filter")) : [];

    if (temp.includes(collection)) {
      temp = temp.filter(cat => cat !== collection);
    } else {
      temp.push(collection)
    }

    localStorage.setItem("hrdtkr_collections_filter", JSON.stringify(temp));
    this.storageSub.next('localStorageChanged');
  }

  async getFilterProducts() {
    this.spinner.show();
    let categories = JSON.parse(localStorage.getItem("hrdtkr_categories"));
    let minPrice = JSON.parse(localStorage.getItem("hrdtkr_minPrice_filter"));
    let maxPrice = JSON.parse(localStorage.getItem("hrdtkr_maxPrice_filter"));
    let collections = JSON.parse(localStorage.getItem("hrdtkr_collections_filter"));
    let title = JSON.parse(localStorage.getItem("hrdtkr_product_title"));

    let payload = {
      categoryIds: categories.length > 0 ? categories : null,
      minPrice: minPrice,
      maxPrice: maxPrice || null,
      collections: collections.length > 0 ? collections : [],
      title: title || null
    };

    return this.getFilterProductsAPI(payload).toPromise().then(async (products: Array<any>) => {
      this.spinner.hide();

      return products;
    })
  }

  setPriceFilter(priceObj) {
    console.log("priceObj: ", priceObj)
    localStorage.setItem("hrdtkr_minPrice_filter", priceObj.minPrice)
    localStorage.setItem("hrdtkr_maxPrice_filter", priceObj.maxPrice)
    this.storageSub.next('localStorageChanged');
  }

  updateProductTitleFilter(productTitle) {
    localStorage.setItem("hrdtkr_product_title", JSON.stringify(productTitle))
    this.storageSub.next('localStorageChanged');
  }

  // filterByCategory(categoriesLocalStorage, products) {
  //   return new Promise(res => {
  //     this.getCategories().toPromise().then((categories: Array<any>) => {
  //       let actualCategories = [];

  //       for (let index = 0; index < categories.length; index++) {
  //         const category: any = categories[index];

  //         if (categoriesLocalStorage.includes(category.CategoryName)) {
  //           actualCategories.push(category)
  //         }
  //       }

  //       let categoryFilteredProductList: Array<any> = [];
  //       for (let index = 0; index < products.length; index++) {
  //         const product = products[index];

  //         for (let index = 0; index < actualCategories.length; index++) {
  //           const category = actualCategories[index];

  //           if (category._id == product.categoryId) {
  //             categoryFilteredProductList.push(product);
  //           }
  //         }
  //       }

  //       res(categoryFilteredProductList);
  //     });
  //   });
  // }

  // filterByCollections(collectionsLocalStorage, products) {
  //   let temp: Array<any> = [];
  //   for (let index = 0; index < products.length; index++) {
  //     const product = products[index];

  //     if (product.collections.filter((n) => collectionsLocalStorage.indexOf(n) !== -1).length > 0) {
  //       temp.push(product)
  //     }
  //   }

  //   return temp;
  // }
}