import { Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor() { }

  private data = [
    {
      categoria: 'Burguer',
      expanded: true,
      products : [
        { id: 0, name: 'Burguer 01', price: 8 },
        { id: 1, name: 'Burguer 02', price: 5 },
        { id: 2, name: 'Burguer 03', price: 9 },
        { id: 3, name: 'Burguer 04', price: 7 },
        { id: 4, name: 'Burguer 05', price: 6 }
      ]
    },
    {
      categoria: 'Bebidas',
      products: [
        { id: 5, name: 'Bebida 01', price: 8 },
        { id: 6, name: 'Bebida 02', price: 5 },
        { id: 7, name: 'Bebida 03', price: 9 },
        { id: 8, name: 'Bebida 04', price: 7 },
        { id: 9, name: 'Bebida 05', price: 6 }
      ]
    },
    {
      categoria: 'Massas',
      products: [
        { id: 10, name: 'Massa 01', price: 8 },
        { id: 11, name: 'Massa 02', price: 5 },
        { id: 12, name: 'Massa 03', price: 9 },
        { id: 13, name: 'Massa 04', price: 7 },
        { id: 14, name: 'Massa 05', price: 6 }
      ]
    }
  ]

  private cart = [];

  getProducts(){
    return this.data;
  }

  getCart(){
    return this.cart;
  }

  addProduct(product){
    this.cart.push(product)
  }

  removeProduct(product){
    if (product === 0){
      this.cart.shift();
    } else {
      this.cart.splice(product, 1)
    }
  }

}
