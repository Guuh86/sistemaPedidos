import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  idPedido: any;
  array = [];

  private loading: any;

  constructor(
    private modal: ModalController,
    private nav: NavParams,
    private crud: CrudService,
    private load: LoadingController,
  ) { }

  ngOnInit() {
    this.idPedido = this.nav.get('id_pedido');
    this.array.push(this.idPedido);
    console.log(this.array);
  }

  async presentLoad(){
    this.loading = await this.load.create({
      message: 'Carregando pedido. Aguarde...'
    });
    return this.loading.present();
  }

  prepararPedido(){
    
  }

  close(){
    this.modal.dismiss();
  }

}
