import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.scss'],
})
export class CardapioPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  start(){
    this.router.navigate(['/home']);
  }

  cozinha(){
    this.router.navigate(['/cozinha'])
  }

}
