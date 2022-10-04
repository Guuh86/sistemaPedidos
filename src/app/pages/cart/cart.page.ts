import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { CrudService } from 'src/app/services/crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Status } from 'src/app/interfaces/status';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectedItems = [];
  total = 0;

  public pedidoForm: FormGroup;
  public clienteForm: FormGroup;
  public statusForm: FormGroup;

  nome: string;
  cpf: number;
  mesa: number;

  status: Status[];

  private loading: any;

  constructor(
    private cart: ProdutoService,
    private fb: FormBuilder,
    private crud: CrudService,
    private router: Router,
    private alert: AlertController,
    private load: LoadingController
  ) { }

  ngOnInit() {
    let items = this.cart.getCart();
    let selected = {};

    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = { ...obj, count: 1 }
      }
    }

    this.selectedItems = Object.keys(selected).map(key => selected[key]);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);

  }

  async openAlert() {
    const alert = await this.alert.create({
      header: 'Complete as informações do pedido',
      inputs: [
        {
          placeholder: 'Nome',
          type: 'text',
          name: 'nome',
          attributes: {
            maxlength: 52
          }
        },
        {
          placeholder: 'CPF (Somente números)',
          type: 'number',
          name: 'cpf',
          min: 11,
          max: 11
        },
        {
          type: 'number',
          name: 'mesa',
          placeholder: 'Número da Mesa',
          min: 1,
          max: 2
        }
      ],
      buttons: [
        {
          text: 'ENVIAR', handler: (res) => {
            if (this.selectedItems.length != 0) {
              this.createPedido(res);
            } else {
              this.showAlertaVazio();
            }
          }
        },
        {
          text: 'CANCELAR'
        }
      ]
    })
    return await alert.present();
  }

  async createPedido(res) {
    await this.showLoading();

    try {
      this.nome = res.nome;
      this.cpf = res.cpf;
      this.mesa = res.mesa;

      this.pedidoForm = this.fb.group({
        nome: [this.nome],
        cpf: [this.cpf],
        mesa: [this.mesa],
        status: ['0'],
        statusDesc: ['ENVIADO PARA A COZINHA'],
        pedido: [this.selectedItems]
      });

      this.statusForm = this.fb.group({
        idPedido: [this.cpf],
        status: [0]
      })
      this.crud.create(this.pedidoForm.value, this.cpf).then(resp => {
        this.router.navigate(['/carrinho']);
      })
    } catch (error) {
      console.log(error);
    } finally {
      await this.loading.dismiss();
    }
  }

  async showLoading() {
    this.loading = await this.load.create({
      message: 'Enviando o seu pedido para a cozinha. Pera ae...'
    });
    return this.loading.present();
  }

  async showAlerta() {
    const a = await this.alert.create({
      header: 'Oops!',
      message: 'Algo deu errado ao enviar o seu pedido para a cozinha! <br/> Se o problema persistir, por favor, chamar um garçom para dar continuidade',
      buttons: ['OK']
    });
    await a.present();
  }

  async showAlertaVazio() {
    const a = await this.alert.create({
      header: 'Pera ae!',
      message: 'Parece que o seu carrinho está vazio :( <br/> Adicione algo para dar continuidade',
      buttons: ['OK']
    });
    await a.present();
  }

  async avisoRemover(product) {
    const x = await this.alert.create({
      header: 'ATENÇÃO!',
      subHeader: 'Tem certeza que deseja remover este item?',
      message: 'Caso este item tenha mais de uma quantidade selecionada todas elas serão removidas. Deseja continuar?',
      buttons: [
        {
          text: 'REMOVER', handler: () => {
            let index = this.selectedItems.indexOf(product);
            if (index > -1) {
              this.cart.removeProduct(index);
              this.selectedItems.splice(index, 1);
              console.log(this.selectedItems);
            }
            this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
          }
        },
        {
          text: ' CANCELAR'
        }
      ]
    })
    await x.present()
  }

}
