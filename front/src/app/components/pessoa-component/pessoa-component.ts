import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PessoaService } from '../../service/pessoa-service';
import { PessoaModel } from '../../model/PessoaModel';

@Component({
  selector: 'app-projeto-crud',
  templateUrl: './pessoa-component.html',
  styleUrls: ['./pessoa-component.css'],
  imports: [ReactiveFormsModule]
})
export class PessoaComponent implements OnInit {

  btnCadastrar: boolean = true;

  // ---------------------------
  // Formulário reativo tipado
  // ---------------------------
  pessoa = new FormGroup({
    id: new FormControl<number | null>(null),
    nome: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl<number | null>(null, [Validators.required, Validators.max(120)]),
    cidade: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)])
  });

  // Vetor para armazenar pessoas
  vetor: PessoaModel[] = [];

  // Índice da pessoa selecionada
  indicePessoaSelecionada: number = -1;

  constructor(private service: PessoaService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.service.listarTodos().subscribe(pessoas => {
      console.log('Pessoas recebidas do backend:', pessoas);
      this.vetor = pessoas;
    });
  }

  // ---------------------------
  // Cadastrar nova pessoa
  // ---------------------------
  cadastrar(): void {
    const novaPessoa: PessoaModel = this.pessoa.value as PessoaModel;

    // Gera ID incremental (se não tiver backend cuidando disso)
    novaPessoa.id = this.vetor.length > 0 ? (this.vetor[this.vetor.length - 1].id ?? 0) + 1 : 1;

    this.vetor.push(novaPessoa);
    this.pessoa.reset();
  }

  // ---------------------------
  // Selecionar pessoa para edição
  // ---------------------------
  selecionar(indice: number): void {
    this.indicePessoaSelecionada = indice;

    this.pessoa.get('id')?.setValue(this.vetor[indice].id ?? null);
    this.pessoa.get('nome')?.setValue(this.vetor[indice].nome || '');
    this.pessoa.get('idade')?.setValue(this.vetor[indice].idade ?? null);
    this.pessoa.get('cidade')?.setValue(this.vetor[indice].cidade || '');

    this.btnCadastrar = false;
  }

  // ---------------------------
  // Cancelar ações
  // ---------------------------
  cancelar(): void {
    console.log('Cancelando edição, resetando formulário...');
    this.pessoa.reset();
    this.indicePessoaSelecionada = -1;
    this.btnCadastrar = true;
  }

  // ---------------------------
  // Alterar pessoa
  // ---------------------------
  alterar(): void {
    if (this.indicePessoaSelecionada >= 0) {
      this.vetor[this.indicePessoaSelecionada] = this.pessoa.value as PessoaModel;
    }
    this.cancelar();
  }

  // ---------------------------
  // Remover pessoa
  // ---------------------------
  remover(): void {
    if (this.indicePessoaSelecionada >= 0) {
      this.vetor.splice(this.indicePessoaSelecionada, 1);
    }
    this.cancelar();
  }
}
