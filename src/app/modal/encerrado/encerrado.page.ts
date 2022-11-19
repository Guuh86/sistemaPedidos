import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-encerrado',
  templateUrl: './encerrado.page.html',
  styleUrls: ['./encerrado.page.scss'],
})
export class EncerradoPage implements OnInit {

  array = [];
  idPedido: any;
  date = new Date();
  totalPedido = 0;
  private loadingX: any;
  pdfObj: any;

  constructor(
    private modal: ModalController,
    private load: LoadingController,
    private nav: NavParams
  ) { }

  close() {
    this.modal.dismiss();
  }

  ngOnInit() {
    this.idPedido = this.nav.get('id_pedido');
    this.array = [];
    this.array.push(this.idPedido);
    console.log(this.array);
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array[i].pedido.length; j++) {
        this.totalPedido += this.array[i].pedido[j].price
      }
    }
  }

  async generateLoad() {
    this.loadingX = await this.load.create({
      message: 'Gerando PDF. Aguarde...'
    })
    return this.loadingX.present();
  }

  async generatePDF() {
    await this.generateLoad();
    try {
      let node: any = document.getElementById('print');
      htmlToImage.toPng(node).then(dataUrl => {
        let img = new Image();
        img.src = dataUrl.toString();
        let pdf = {
          content: [
            { image: `${img.src}`, width: 200 }
          ]
        }
        this.pdfObj = pdfMake.createPdf(pdf);
        this.pdfObj.open();
      }).catch(error => {
        console.log(error);
      })
    } catch (error){
      console.log(error);
    } finally {
      this.loadingX.dismiss();
    }
  }

}
