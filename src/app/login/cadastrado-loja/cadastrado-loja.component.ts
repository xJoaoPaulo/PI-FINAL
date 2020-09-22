import { CadastradoLojaService } from './shared/cadastrado-loja.service';
import { CadastradoLoja } from './shared/cadastrado-loja.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrado-loja',
  templateUrl: './cadastrado-loja.component.html',
  styleUrls: ['./cadastrado-loja.component.css']
})
export class CadastradoLojaComponent implements OnInit {

  request: CadastradoLoja = {
    nmEmail: '',
    nrCpf: ''
  };

  constructor(private cadastradoLoja: CadastradoLojaService) { }

  ngOnInit(): void {
  }

  adicionarSenha() {
    this.cadastradoLoja.putEmail(this.request).subscribe(
      // response => { this.request = response;}
    )
  }

}
