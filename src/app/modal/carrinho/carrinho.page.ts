import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirect(){
    this.router.navigate(['/consulta'])
  }

  redirectCard(){
    this.router.navigate(['/home'])
  }

}
