import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Produto } from 'src/app/interfaces/produto';
import { ModalController } from '@ionic/angular';
import { PedidoPage } from 'src/app/modal/pedido/pedido.page';
import { EncerradoPage } from 'src/app/modal/encerrado/encerrado.page';
import { CozinhaResultPage } from 'src/app/modal/cozinha-result/cozinha-result.page';

@Component({
  selector: 'app-cozinha',
  templateUrl: './cozinha.page.html',
  styleUrls: ['./cozinha.page.scss'],
})
export class CozinhaPage implements OnInit {

  pedidoData: any;
  encerradosData: any;
  expanded: boolean;
  id: any;

  pedidoClosed: [];

  selectValue: string = 'open';

  constructor(
    private crud: CrudService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.crud.read().subscribe((res) => {
      this.pedidoData = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Produto
        }
      })
      console.log(this.pedidoData)
    });

    this.crud.readClosed().subscribe((resC) => {
      this.encerradosData = resC.map((x) => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data() as Produto
        }
      })
    })
  }

  async openModal(value) {
    const modal = await this.modal.create({
      component: PedidoPage,
      componentProps: {
        id_pedido: value
      }
    });
    modal.present();
  }

  async openEncerrado(value){
    const modal = await this.modal.create({
      component: EncerradoPage,
      componentProps: {
        id_pedido: value
      }
    });
    modal.present();
  }

  async openCozinhaResult(value){
    const modal = await this.modal.create({
      component: CozinhaResultPage,
      componentProps: {
        id_pedido: value
      }
    });
    modal.present();
  }

}
