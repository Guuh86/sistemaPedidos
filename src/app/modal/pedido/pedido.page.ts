import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';
import { LoadingController } from '@ionic/angular';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  idPedido: any;
  array = [];
  totalPedido = 0;

  date = new Date();

  private loading: any;
  private loadingX: any;
  content: string;
  pdfObj: any;

  constructor(
    private modal: ModalController,
    private nav: NavParams,
    private crud: CrudService,
    private load: LoadingController
  ) { }

  ngOnInit() {
    this.idPedido = this.nav.get('id_pedido');
    this.array.push(this.idPedido);
    console.log(this.array);
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array[i].pedido.length; j++) {
        this.totalPedido += this.array[i].pedido[j].price
      }
    }
  }

  async presentLoad() {
    this.loading = await this.load.create({
      message: 'Carregando pedido. Aguarde...'
    });
    return this.loading.present();
  }

  async generateLoad() {
    this.loadingX = await this.load.create({
      message: 'Gerando PDF. Aguarde...'
    })
    return this.loadingX.present();
  }

  updatePreparando(id) {
    this.array = [];
    this.crud.update(id, {
      status: '1',
      statusDesc: 'PEDIDO LIDO PELA COZINHA E ESTÁ EM PREPARO'
    });
    this.ngOnInit();
  }

  updateEncerrado(id) {
    this.array = [];
    this.crud.update(id, {
      status: '2',
      statusDesc: 'O PEDIDO FOI FEITO E ESTÁ SENDO ENVIADO PARA VOCÊ'
    });
    this.ngOnInit();
  }

  updateCancelado(id) {
    this.array = [];
    this.crud.update(id, {
      status: '3',
      statusDesc: 'POXA, SEU PEDIDO FOI CANCELADO!'
    });
    this.ngOnInit();
  }

  changeData(value) {
    for (let i = 0; i < this.array.length; i++) {
      if (value == this.array[i].id) {
        this.array.forEach(x => {
          const ecerrado = x;
          this.createClosedPedido(value, ecerrado);
        });
      }
    }
  }

  async generatePDF() {
    await this.generateLoad();
    try {
      let node: any = document.getElementById('print');
      htmlToImage.toPng(node).then(dataUrl => {
        let img = new Image();
        img.src = dataUrl.toString();
        //let content = document.body.appendChild(img);
        let pdf = {
          content: [
            { image: `${img.src}`, width: 200 }
          ]
        }
        this.pdfObj = pdfMake.createPdf(pdf);
        this.pdfObj.download();
      }).catch(error => {
        console.log(error);
      })
    } catch (error){
      console.log(error);
    } finally {
      this.loadingX.dismiss();
    }
  }

  close() {
    this.modal.dismiss();
  }

  createClosedPedido(value, data) {
    this.crud.createClosed(value, data);
    this.modal.dismiss();
    this.deletePedido(value);
  }

  deletePedido(value) {
    this.crud.delete(value);
  }

}
