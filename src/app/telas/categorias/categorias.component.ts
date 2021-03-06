import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/servicos/categorias.service';
import { Categoria } from './categoria.model';
import { Router } from '@angular/router';
import { Page } from './model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private router: Router, private categoriaService: CategoriasService) { }

  categorias: Categoria[] = []; 
  page!: Page;


  public paginaAtual: number = 0
  public itemsPerPage: number = 10
  

  ngOnInit(): void {
    this.pagefindAll(this.paginaAtual, this.itemsPerPage);
  }

  findAll(){
    this.categoriaService.findAll().subscribe(categorias => {
      this.categorias = categorias
      console.log(categorias)
    })
  }

  pagefindAll(page: number, qtd: number){
    this.categoriaService.findAllPage(page, qtd).subscribe(page => {
      this.page = page;
      this.categorias = page['content']
      console.log(page['totalElements'])
    })
  }


  remover(id: number):void {
    confirm("Tem certeza que deseja remover a categoria?")
      this.categoriaService.delete(id).subscribe(categorias => {
      console.log("removido com sucesso")
      this.findAll();
    }, err => {
      alert("Não foi possível remover a categoria")
    })
  }

  editar(id:number){
      this.router.navigate(['home/editarcategoria/' + id])
  }

  pageChange(){
    console.log(event)
  }

}
