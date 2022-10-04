import { Component, OnInit, OnChanges } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Subscription } from 'rxjs';
import { AlertController, ModalController } from '@ionic/angular';
import { ResultPage } from 'src/app/modal/result/result.page';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  cpf: string;
  dataPedido: Subscription;
  pedido = [];

  constructor(
    private crud: CrudService,
    private modal: ModalController,
    private alerta: AlertController
  ) { }

  ngOnInit() {
      
  }

  getData(){
    if(!this.dataPedido){
      this.dataPedido = this.crud.get(this.cpf).subscribe(data => {
        this.pedido = [];
        this.pedido.push(data);
        console.log('consulta: ' + this.pedido);
      });
    } else {
      this.sendAlert();
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
