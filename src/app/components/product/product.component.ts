import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService]
})
export class ProductComponent implements OnInit {

  products:Product[] = [];
  
  title="ürün listesi"
  filterText="";
  constructor(private productService:ProductService ,
    private activatedRouted:ActivatedRoute) { }

  ngOnInit(): void {
  this.activatedRouted.params.subscribe(params => {
    if(params["categoryId"]){
          this.getProductsByCategory(params["categoryId"])
    }else{
    this.getProducts();
    }
  })
  }

  getProducts(){
    this.productService.getProducts().subscribe(
    response => this.products=response.data
    )
  }

  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(
    response => this.products=response.data
    )
  }
}
