import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  idPedido: any;
  values: any;

  constructor(
    private nav: NavParams,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.values = this.nav.get('dataResult');
    console.log(this.values);
  }

  close(){
    this.modal.dismiss();
  }

}
