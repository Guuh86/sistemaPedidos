import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Produto } from 'src/app/interfaces/produto';
import { ModalController } from '@ionic/angular';
import { PedidoPage } from 'src/app/modal/pedido/pedido.page';

@Component({
  selector: 'app-cozinha',
  templateUrl: './cozinha.page.html',
  styleUrls: ['./cozinha.page.scss'],
})
export class CozinhaPage implements OnInit {

  pedidoData: any;
  encerradosData: any;
  expanded: boolean;

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

}
