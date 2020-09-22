import { CarouselProdutosService } from './shared/carousel-produtos.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ResponseProdutos } from '../categorias/shared/produto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-items',
  templateUrl: './carousel-items.component.html',
  styleUrls: ['./carousel-items.component.css']
})
export class CarouselItemsComponent implements OnInit {

  carousel: boolean;

  responseProdutos: ResponseProdutos[];
  // responseProdutosMVendido: ResponseProdutos[];
  // responseProdutosPromo: ResponseProdutos[];

  constructor(
    private carouselProdutosService: CarouselProdutosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.carousel = true;
    $(document).ready(function() {
      $('.autoWidth').lightSlider({
          item:4,
          loop:false,
          slideMove:2,
          easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
          speed:600,
          responsive : [
              {
                  breakpoint:800,
                  settings: {
                      item:3,
                      slideMove:1,
                      slideMargin:6,
                    }
              },
              {
                  breakpoint:480,
                  settings: {
                      item:1,
                      slideMove:1
                    }
              }
          ],
          onSliderLoad: function() {
              $('.autoWidth').removeClass('cS-hidden');
          } 
      });  
    });
    this.listarProdutosCarousel();
  }

  listarProdutosCarousel() {
    this.carouselProdutosService.getProdutosDestaque().subscribe(response => {
      this.responseProdutos = response;
      // this.carousel = false;
    });
    // this.carouselProdutosService.getProdutosMVendidos().subscribe(response => {
    //   this.responseProdutosMVendido = response;
    // });
    // this.carouselProdutosService.getProdutosPromo().subscribe(response => {
    //   this.responseProdutosPromo = response;
    // });
  }

  clicked(cd: number) {
    this.router.navigateByUrl('categorias/produto', { skipLocationChange: true }).then(() => {
      this.router.navigate([`categorias/produto/${cd}`]);
    });
  }

}
