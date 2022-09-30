import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cart = [];
  items = [];

  results = [];

  private loading: any;

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  constructor(
    private prod: ProdutoService,
    private router: Router,
    private load: LoadingController,
    private alert: AlertController
  ) {

  }

  ngOnInit(): void {
    this.loadContent();
  }

  addToCart(product) {
    this.prod.addProduct(product);
  }

  openCart() {
    this.router.navigate(['cart']);
  }

  async loadContent() {
    await this.showLoading();
    try {
      this.cart = this.prod.getCart();
      this.items = this.prod.getProducts();
      this.results = this.prod.getProducts();
    } catch (error) {
      console.log(error);
      this.showAlert();
    } finally {
      await this.loading.dismiss();
    }
  }

  async showLoading() {
    this.loading = await this.load.create({
      message: 'Carregando Conteúdo. Aguarde...'
    });
    return this.loading.present();
  }

  async showAlert(){
    const alerta = await this.alert.create({
      header: 'Oops!',
      message: 'Algo de errado não está certo :/ <br/> Recarregue a página e tente novamente! <br/> Se problema persistir, aguarde alguns instantes ;)',
      buttons: ['OK']
    });
    await alerta.present();
  }

}