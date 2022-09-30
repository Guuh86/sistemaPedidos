import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'cardapio',
    pathMatch: 'full'
  },
  {
    path: 'cardapio',
    loadChildren: () => import('./pages/cardapio/cardapio.module').then( m => m.CardapioPageModule)
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./modal/carrinho/carrinho.module').then( m => m.CarrinhoPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'cozinha',
    loadChildren: () => import('./pages/cozinha/cozinha.module').then( m => m.CozinhaPageModule)
  },
  {
    path: 'consulta',
    loadChildren: () => import('./pages/consulta/consulta.module').then( m => m.ConsultaPageModule)
  },
  {
    path: 'pedido/:id',
    loadChildren: () => import('./modal/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
