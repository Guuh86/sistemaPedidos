import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  presentingElement = null;

  cpf: string;
  dataPedido: Subscription;
  pedido = [];

  constructor(
    private crud: CrudService
  ) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  showData(){
    this.dataPedido = this.crud.get(this.cpf).subscribe(data => {
      this.pedido.push(data);
      console.log(this.pedido);
    })
  }

  closeModal(){
    window.location.reload();
  }
}
