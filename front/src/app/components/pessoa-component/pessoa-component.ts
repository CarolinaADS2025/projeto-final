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

  // ---------------------------
  // Controla a visibilidade do botão Cadastrar/Alterar
  // true = exibe "Cadastrar"
  // false = exibe "Alterar" e "Remover"
  // ---------------------------
  btnCadastrar: boolean = true;

  // ---------------------------
  // Formulário reativo para cadastro/edição de pessoa
  // ---------------------------
  pessoa = new FormGroup({
    id: new FormControl(''), // usado para edição
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl('', [Validators.required, Validators.max(120)]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  // ---------------------------
  // Array local para armazenar pessoas
  // ---------------------------
  vetor: PessoaModel[] = [];

  // ---------------------------
  // Índice da pessoa selecionada para alteração/remover
  // ---------------------------
  indicePessoaSelecionada: number = -1;

  // ---------------------------
  // Injeção do service responsável por chamadas HTTP
  // ---------------------------
  constructor(private service: PessoaService) {}

  // ---------------------------
  // Ao inicializar, lista todas as pessoas
  // ---------------------------
  ngOnInit(): void {
    this.listar();
  }

  // ---------------------------
  // Listar todas as pessoas do backend
  // ---------------------------
  listar(): void {
    this.service.listarTodos().subscribe(pessoas => this.vetor = pessoas);
  }

  // ---------------------------
  // Cadastrar nova pessoa
  // ---------------------------
  cadastrar(): void {
    if (this.pessoa.invalid) return; // validação simples

    const novaPessoa: PessoaModel = {
      nome: this.pessoa.value.nome ?? '',
      idade: Number(this.pessoa.value.idade ?? 0),
      cidade: this.pessoa.value.cidade ?? ''
    };

    this.service.cadastra(novaPessoa).subscribe((pessoaCadastrada: any) => {
      this.vetor.push(pessoaCadastrada); // adiciona no array local
      this.cancelar();                    // limpa formulário
    });
  }

  // ---------------------------
  // Seleciona pessoa para edição
  // Preenche o formulário com os dados
  // ---------------------------
  selecionar(indice: number): void {
    this.indicePessoaSelecionada = indice;
    const p = this.vetor[indice];

    this.pessoa.patchValue({
      id: p.id ?? '',
      nome: p.nome ?? '',
      idade: p.idade?.toString() ?? '',
      cidade: p.cidade ?? ''
    });

    this.btnCadastrar = false; // muda para modo "Alterar/Remover"
  }

  // ---------------------------
  // Cancela edição
  // ---------------------------
  cancelar(): void {
    this.pessoa.reset();
    this.indicePessoaSelecionada = -1;
    this.btnCadastrar = true;
  }

  // ---------------------------
  // Alterar pessoa existente
  // ---------------------------
 alterar(): void {
  if (this.pessoa.invalid) return;

  const pessoaAtualizada: PessoaModel = {
    id: Number(this.pessoa.value.id ?? 0),
    nome: this.pessoa.value.nome ?? '',
    idade: Number(this.pessoa.value.idade ?? 0),
    cidade: this.pessoa.value.cidade ?? ''
  };

  this.service.atualiza(pessoaAtualizada).subscribe((pessoaModificada) => {
    // compara convertendo p.id para number
    const indice = this.vetor.findIndex(p => Number(p.id) === Number(pessoaModificada.id));
    if (indice >= 0) this.vetor[indice] = pessoaModificada;
    this.vetor = [...this.vetor]; // força atualização da tabela
    this.cancelar();
  });
}


  // ---------------------------
  // Remover pessoa selecionada
  // ---------------------------
 remover(): void {
  const id = Number(this.pessoa.value.id ?? 0); // garante number
  if (!id) return;

  this.service.remove(id).subscribe(() => {
    // converte p.id para number antes de comparar
    this.vetor = this.vetor.filter(p => Number(p.id) !== id);
    this.cancelar();
  });
}

}
