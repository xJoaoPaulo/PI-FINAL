import { ResponseProdutos } from './../categorias/shared/produto.model';
import { CestaService } from './../cesta/shared/cesta.service';
import { Cliente } from './../cadastro/shared/cliente.model';
import { PagamentoService } from './shared/pagamento.service';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { DocumentoFiscal, ItemProduto } from './shared/pagamento.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Produtos } from '../categorias/shared/produto.model';
import { Cartao, CartaoCliente } from '../cadastro/shared/cartao.model';
import { AlterarInfoService } from '../minha-conta/shared/alterar-info.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],

})
export class PagamentoComponent implements OnInit {

  state: string = 'small';

  enderecoId: number;

  endereco: any;

  itensNf: Array<any> = [];

  ok: boolean = false;
  okCredito: boolean = false;
  okDebito: boolean = false;


  opcaoPagamento: number;
  cartaoSelecionado: number;
  teste: boolean;

  requestProdutos: ItemProduto[] = [{
    cdProduto: null,
    qtProduto: null,
  }];

  request: DocumentoFiscal = {
    idCliente: null,
    idEndereco: null,
    idFormaPagamento: null,
    itensDTOPost: this.itensNf,
    nmNomeTitular: '',
    nrNumeroCartao: '',
  }

  index: number;
  selectedPagamento: boolean;
  cliente: Cliente;
  clienteId: number;
  produtos: Produtos[];


  constructor(

    private alterarInfoService: AlterarInfoService,
    private pagamentoService: PagamentoService,
    private cestaService: CestaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  itens = [];

  ngOnInit(): void {
    this.selectedPagamento = false;
    this.cliente = (JSON.parse(localStorage['cliente']));
    this.produtos = (JSON.parse(localStorage['produtos']));
    this.endereco = (JSON.parse(localStorage['enderecoCompra']));
    console.log(this.endereco)
    this.buscarCartaoCliente();
    console.log(this.produtos);
  }

  calculaCesta() {
    return this.cestaService.calculaCesta();
  }

  
  pagamentoEValido(): boolean {
    if (this.okCredito) {
      let maisUm: boolean = false;
      this.cartoes.forEach(element => {
        if (element.mes != '' && element.ano != '' && element.cvc != '') {
          let dataCartao = new Date(element.mes + '/01/' + element.ano);
          let dataAtual = new Date();
          let dataDoCartao = dataCartao.getTime();
          let dataComparativa = dataAtual.getTime();
          if(dataDoCartao > dataComparativa){
            maisUm = true;
          }
        }
      });
      console.log("passou no primeiro")
      return maisUm;
    } else if (this.okDebito) {
      return true;
    } else {
      alert("Dados de Pagamento Invalidos!");
      console.log("passou aqui tbm")
      return false;
    }

  }


  verificar(idPagamento: number) {
    if (idPagamento === null) {
      this.ok = false;
    } else if (idPagamento === 1) {
      this.okCredito = true;
      this.okDebito = false;
      this.ok = true;
    } else if (idPagamento === 2) {
      this.okDebito = true;
      this.okCredito = false;
      this.ok = true;
    } else {
      this.okDebito = false;
      this.okCredito = false;
      this.ok = true;
    }
    this.request.idFormaPagamento = idPagamento;
  }

  clicked(): void {

    let outro: boolean = this.pagamentoEValido();

    if(outro){

    var produtos: Array<any> = [];

    produtos = JSON.parse(localStorage['produtos']);
    this.cliente = (JSON.parse(localStorage['cliente']));
    this.itens = (JSON.parse(localStorage.getItem('produtos')));
    this.request.idCliente = this.cliente.idCliente;
    this.request.idEndereco = this.endereco;
    //console.log(produtos.length)

    for (var contador = 0; contador < produtos.length; contador++) {
      let itensNf = new ItensNf;
      itensNf.cdProduto = this.itens[contador].cdProduto;
      itensNf.qtProduto = this.itens[contador].qtProduto;
      this.itensNf.push(itensNf);

      // this.request.itensDTOPost[contador].cdProduto = this.itens[contador].cdProduto;
      // this.request.itensDTOPost[this.index].qtProduto = this.itens[this.index].quantidade;
      // console.log(contador);
    }
    console.log(this.request);
    this.pagamentoService.postNota(this.request).subscribe();
    alert('Compra realizada com Sucesso! Sua compra poderá ser visualizada em histórico de pedidos');
    localStorage.removeItem('produtos');
    localStorage.removeItem('enderecoCompra');
    this.cestaService.limpaCesta();
    this.router.navigate(['']);
  }else{
    alert('Dados de pagamento invalidos')
  }
}

  // tipoPagamento(id: string) {
  //   if(id === '1') {
  //     this.selectedPagamento = true;
  //   }
  // }


  //Método para inserir cartão de crédito
  finalizaCompra() {
    this.pagamentoService.postNota(this.request).subscribe(response => {
      this.request = response;
      console.log(response);
      let pagamento = localStorage['pagamento'] = JSON.stringify(this.request);
      alert('Pagamento efetuado com sucesso!!!');
    })
  }

  funcao(numeroCartao: string, nomeCartao: string) {
    this.request.nrNumeroCartao = numeroCartao;
    this.request.nmNomeTitular = nomeCartao;
    console.log('numero do cartao: ' + this.request.nmNomeTitular);
    console.log('nome no cartão: ' + this.request.nrNumeroCartao);
  }

  requestC: Cartao = {
    idCartaoCredito: null,
    nrNumeroCartao: '',
    nmNomeTitular: '',
    idCliente: null
  }



  primeiroCartao: any;
  cartoes: CartaoPagamento[];
  //Método para buscar cartão
  buscarCartaoCliente() {
    this.cartoes = [];
    this.cliente = JSON.parse(localStorage['cliente']);
    this.alterarInfoService.getCartao(this.cliente.idCliente).subscribe(response => {
      response.cartoesCreditoDTO.forEach(cartao => {
        this.cartoes.push(new CartaoPagamento(cartao));
      })
      this.primeiroCartao = this.cartoes[0];//Retorna o objeto cartão no array
      console.log(this.primeiroCartao);
      console.log(this.requestC.idCartaoCredito);

    })
  }

  inserirCartao() {
    console.log(this.cliente.cartoesCreditoDTO)
    this.cliente = JSON.parse(localStorage['cliente']);
    this.alterarInfoService.postCartao(this.cliente.idCliente, this.requestC).subscribe();
    alert("Cartão Inserido com Sucesso");
    window.location.reload();
    console.log(this.requestC);
  }

}

export class ItensNf {
  public qtProduto: number;
  public cdProduto: number;
}


class CartaoPagamento {
  idCartaoCredito: number;
  nrNumeroCartao: string;
  nmNomeTitular: string;
  idCliente: number;
  mes = '';
  ano = '';
  cvc = '';


  constructor(dados) {
    this.idCartaoCredito = dados.idCartaoCredito;
    this.nrNumeroCartao = dados.nrNumeroCartao;
    this.nmNomeTitular = dados.nmNomeTitular;
    this.idCliente = dados.idCliente;
  }

}