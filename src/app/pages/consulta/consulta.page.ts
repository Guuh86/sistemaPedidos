import { Component, OnInit, OnChanges } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ResultPage } from 'src/app/modal/result/result.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  cpf: string;
  dataPedido: any;
  pedido = [];
  loading: any;

  constructor(
    private crud: CrudService,
    private modal: ModalController,
    private alerta: AlertController,
    private loader: LoadingController,
    private db: AngularFirestore
  ) { }

  ngOnInit() {      
  }

  async showLoader(msg: string){
    this.loading = await this.loader.create({
      message: msg
    });
    this.loading.present();
  }

  async verify(){
    await this.showLoader('Procurando o seu pedido. Aguarde...');
    const ref = this.db.collection('Pedidos').doc(this.cpf);
    try {
      await ref.get().subscribe((data) => {
        if(data.exists){
          this.getData();
        } else {
          this.sendAlert();
        }
      });
    } catch (error){
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async getData(){
    await this.showLoader('Procurando o seu pedido. Aguarde...');
    try {
      if(!this.dataPedido){
        this.dataPedido = this.crud.get(this.cpf).subscribe(data => {
          this.pedido = [];
          this.pedido.push(data);
          console.log('consulta: ' + this.pedido);
        });
      }
    } catch (error){
      this.sendAlert();
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async openModal(){
    const modal = await this.modal.create({
      component: ResultPage,
      cssClass: 'modal-pedido-page',
      componentProps: {
        dataResult: this.pedido
      }
    });
    modal.present();
  }

  async sendAlert(){
    const a = await this.alerta.create({
      header: 'ATENÇÃO',
      message: 'Ops! Algo deu errado! <br/> - O ID digitado pode estar errado <br/> - Esse pedido pode ter sido concluído',
      buttons: ['OK']
    });
    await a.present();
  }

}
