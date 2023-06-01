import { ListaDeCompraService } from './../../service/lista-de-compra.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/interfaces/iItem';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges{
  @Input() itemQueSeraEditado!: Item

  editando: boolean = false;
  textoBtn: string = 'Salvar Item'
  valorItem!: string;

  constructor(
    private listaDeCompraService: ListaDeCompraService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['itemQueSeraEditado'].firstChange){
      this.editando = true;
      this.textoBtn = 'Editar Item'
      this.valorItem = this.itemQueSeraEditado?.nome
    }
  }

  editarItem(){
    this.listaDeCompraService.editarItemDalista(
      this.itemQueSeraEditado, this.valorItem)
      this.limparCampo()
      this.editando = false
      this.textoBtn = 'Salvar Item'
  }

  adicionarItem(){
    this.listaDeCompraService.adicionarItemNaLista(this.valorItem)
    this.limparCampo()
  }

  limparCampo(){
    this.valorItem = ''
  }
}
