import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
  providers: [DatePipe]
})
export class PedidoPage implements OnInit {

  idPedido: any;
  array = [];
  totalPedido = 0;

  date = new Date();
  showbtn: boolean;

  private loading: any;

  opt1: boolean = true;
  opt2: boolean = true;
  opt3: boolean = true;
  opt4: boolean = true;

  constructor(
    private modal: ModalController,
    private nav: NavParams,
    private crud: CrudService,
    private load: LoadingController,
    private alert: AlertController,
    private toast: ToastController
  ) { }

  ngOnInit() {
    
  }

  ngViewAfterInit(){
    this.loadData();
  }

  loadData() {
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

  updatePreparando(id) {
    this.array = [];
    this.crud.update(id, {
      status: '1',
      statusDesc: 'PEDIDO LIDO PELA COZINHA E ESTÁ EM PREPARO'
    });
    this.opt1 = false;
    this.opt2 = true;
    this.opt3 = true;
    this.opt4 = true;
    this.loadData();
  }

  updateEncerrado(id) {
    this.array = [];
    this.crud.update(id, {
      status: '2',
      statusDesc: 'O PEDIDO FOI FEITO E ESTÁ SENDO ENVIADO PARA VOCÊ'
    });
    this.opt1 = true;
    this.opt2 = false;
    this.opt3 = true;
    this.opt4 = true;
    this.loadData();
  }

  updateCancelado(id) {
    this.array = [];
    this.crud.update(id, {
      status: '3',
      statusDesc: 'POXA, SEU PEDIDO FOI CANCELADO!'
    });
    this.opt1 = true;
    this.opt2 = true;
    this.opt3 = false;
    this.opt4 = true;
    this.loadData();
  }

  async changeData(id) {
    const alert = await this.alert.create({
      header: 'Tem certeza?',
      subHeader: 'Ao selecionar esta opção o pedido será mivodo para a seção de encerrados. Deseja continuar?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            try {
              for (let i = 0; i < this.array.length; i++) {
                if (id == this.array[i].id) {
                  this.array.forEach(x => {
                    const ecerrado = x;
                    this.createClosedPedido(id, ecerrado);
                  });
                }
              }
            } catch (error){
              this.toastError(error);
            } finally {
              this.loadData();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async toastError(msg: string){
    const toast = await this.toast.create({
      message: msg,
      duration: 2500
    });
    await toast.present();
  }  

  close() {
    this.modal.dismiss();
  }

  async createClosedPedido(id, product) {
    try {
      await this.crud.createClosed(id, product);
      await this.crud.updateClosed(id, {
        endData: new Date()
      });
    } catch (error) {
      this.toastError(error);
    } finally {
      this.modal.dismiss();
      this.deletePedido(id);
    }
  }

  deletePedido(id) {
    this.crud.delete(id);
  }

}
