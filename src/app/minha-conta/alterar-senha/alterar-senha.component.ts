import { AlterarInfoService } from './../shared/alterar-info.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../cadastro/shared/cliente.model';
import { AlterarSenha } from './alterar-senha.model';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {

  cliente: Cliente;

  request: any = {
    idCliente: null,
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  }

  constructor(private alterarInfo: AlterarInfoService) { }

  ngOnInit(): void {
  }

  clienteNew: any;

  alterarSenha() {

    this.cliente = JSON.parse(localStorage['cliente']);

    //Descriptografia da senha (atob + npm install --save angular-base64)
    let senha: string = atob(this.cliente.pwCliente);
    
    console.log(this.clienteNew);

    //Criptografa a senha (btoa)
    this.clienteNew = btoa(this.cliente.pwCliente);
    console.log(this.clienteNew);
    if (this.request.novaSenha == this.request.confirmarSenha && senha == this.request.senhaAtual) {
      this.request.idCliente = this.cliente.idCliente;
      this.cliente.pwCliente = btoa(this.request.senhaAtual);
      //Reload no loalstorage após as alterações
      localStorage.setItem('cliente', JSON.stringify(this.cliente));

      this.alterarInfo.putSenha(this.request).subscribe(response => {
        this.request = response;
        })


      alert("Senha alterada com sucesso!");
    } else {
      alert('As senhas digitadas não conferem, favor verificar!');
    }

    console.log("idcliente: " + this.request.idCliente);
    console.log("senhaAtual: " + this.request.senhaAtual);
    console.log("novaSenha: " + this.request.novaSenha);
    console.log("confirmarSenha: " + this.request.confirmarSenha);
  }

}
