import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EnvironmentUrlService } from './enviroment-url.service';

const state = {
  checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  protected _env: EnvironmentUrlService;
  protected http: HttpClient;
  httpHeaders: any;

  constructor(
    private router: Router,
    injector: Injector,
    private toastrService: ToastrService
  ) {
    this.http = injector.get(HttpClient);
    this._env = injector.get(EnvironmentUrlService);

    // Setting Up token to be passed with request
    // const token = localStorage.getItem('userToken');
    // const SecutiryGroupId = localStorage.getItem("securityGroup");
    // this.httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`,
    //   'GroupId': `${SecutiryGroupId}`
    // });
  }

  // GET: blog/getBlogs
  public getBlogs() {
    let url = this._env.urlAddress + 'blog/getBlogs';
    return this.http.get(url);
  }

  // GET: blog/getBlogs
  public getBlogById(id) {
    let url = this._env.urlAddress + 'blog/getBlogById/' + id;
    return this.http.get(url);
  }
}