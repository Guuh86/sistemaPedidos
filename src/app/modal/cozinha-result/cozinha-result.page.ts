import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-cozinha-result',
  templateUrl: './cozinha-result.page.html',
  styleUrls: ['./cozinha-result.page.scss'],
})
export class CozinhaResultPage implements OnInit {

  idPedido: any;
  loader: any;
  loadingX: any;
  pdfObj: any;
  
  Aberto = [];
  Encerrado = [];

  totalEncerrado = 0;
  totalAberto = 0;

  constructor(
    private nav: NavParams,
    private modal: ModalController,
    private db: AngularFirestore,
    private alert: AlertController,
    private crud: CrudService,
    private toast: ToastController,
    private loading: LoadingController  
  ) { }

  async ngOnInit() {
    await this.showLoader('Obtendo informações. Aguarde...');
    this.idPedido = this.nav.get('id_pedido');
    this.Aberto = [];
    this.Encerrado = [];
    await this.searchAberto();
  }

  async searchAberto(){
    const refAberto = this.db.collection('Pedidos').doc(this.idPedido);
    try {
      refAberto.get().subscribe(data => {
        if(data.exists){
          this.crud.get(this.idPedido).subscribe(value => {
            this.Aberto = [];
            this.Aberto.push(value);
            for (let i = 0; i < this.Aberto.length; i++) {
              for (let j = 0; j < this.Aberto[i].pedido.length; j++) {
                this.totalAberto += this.Aberto[i].pedido[j].price
              }
            }
            console.log(this.Aberto);
          });
        } else {
          this.searchEncerrado();
        }
      })
    } catch (error){
      this.showToast(error);
    } finally{
      this.loader.dismiss();
    }
  }

  async searchEncerrado(){
    const refEncerrado = this.db.collection('Encerrados').doc(this.idPedido);
    try {
      refEncerrado.get().subscribe(data => {
        if (data.exists){
          this.crud.getClosed(this.idPedido).subscribe(value => {
            this.Encerrado = [];
            this.Encerrado.push(value);
            for (let i = 0; i < this.Encerrado.length; i++) {
              for (let j = 0; j < this.Encerrado[i].pedido.length; j++) {
                this.totalEncerrado += this.Encerrado[i].pedido[j].price / 2;
              }
            }
            console.log(this.Encerrado);
          });
        } else {
          this.showAlert();
        }
    })
  } catch (error){
    this.showToast(error);
  } finally{
    this.loader.dismiss();
  }
}
  
  closeModal(){
    this.modal.dismiss();
  }

  async showLoader(msg: string){
    this.loader = await this.loading.create({
      message: msg
    });
    this.loader.present(); 
  }

  async showToast(msg: string){
    const toast = await this.toast.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }

  async showAlert(){
    const alert = await this.alert.create({
      header: 'Aviso!',
      message: 'O pedido não foi encontrado na base de dados.',
      buttons: [{
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.loader.dismiss();
          this.modal.dismiss();
        }
      }]
    });
    alert.present();
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

  async generateLoad() {
    this.loadingX = await this.loading.create({
      message: 'Gerando PDF. Aguarde...'
    })
    return this.loadingX.present();
  }

}
