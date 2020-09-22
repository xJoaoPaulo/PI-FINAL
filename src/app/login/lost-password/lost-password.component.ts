import { LoginForPassword } from './shared/lost-password.model';
import { LostPasswordService } from './shared/lost-password.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.css']
})
export class LostPasswordComponent implements OnInit {

  request: LoginForPassword = {
    login: ''
  }

  constructor(
    private lostPasswordService: LostPasswordService
  ) { }

  ngOnInit(): void {
  }

  alterarSenha() {
    this.lostPasswordService.putSenha(this.request).subscribe(
      // response => { this.request = response;}
    
    )
  }

}
