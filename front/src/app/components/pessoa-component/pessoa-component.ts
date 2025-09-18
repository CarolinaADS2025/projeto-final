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

  vetor: PessoaModel[] = [];
  indicePessoaSelecionada: number = -1;

  constructor(private service: PessoaService) {}

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
  // Cadastrar nova pessoa (agora com id)
  // ---------------------------
  cadastrar(): void {
    if (this.pessoa.invalid) {
      console.log('Formulário inválido no cadastro:', this.pessoa.value);
      return;
    }

    const novaPessoa: PessoaModel = {
      id: this.pessoa.value.id ?? undefined, // <-- agora enviamos o id também
      nome: this.pessoa.value.nome ?? '',
      idade: Number(this.pessoa.value.idade ?? 0),
      cidade: this.pessoa.value.cidade ?? ''
    };

    //remover o id
    delete novaPessoa.id;

    console.log('Enviando para cadastro:', novaPessoa);

    this.service.cadastra(novaPessoa).subscribe((pessoaCadastrada: PessoaModel) => {
      console.log('Pessoa cadastrada com sucesso:', pessoaCadastrada);
      this.vetor.push(pessoaCadastrada);
      console.table(this.vetor);
      this.pessoa.reset();
      this.cancelar();
    });
  }

  // ---------------------------
  // Selecionar pessoa para edição
  // ---------------------------
  selecionar(indice: number): void {
    this.indicePessoaSelecionada = indice;
    const p = this.vetor[indice];
    console.log('Pessoa selecionada para edição:', p);

    this.pessoa.patchValue({
      id: p.id ?? null,          // agora respeita o tipo number | null
      nome: p.nome ?? '',
      idade: p.idade ?? null,    // mantém como number
      cidade: p.cidade ?? ''
    });

    this.btnCadastrar = false;
  }

  cancelar(): void {
    console.log('Cancelando edição, resetando formulário...');
    this.pessoa.reset();
    this.indicePessoaSelecionada = -1;
    this.btnCadastrar = true;
  }

  alterar(): void {
    if (this.pessoa.invalid) {
      console.log('Formulário inválido na alteração:', this.pessoa.value);
      return;
    }

    const pessoaAtualizada: PessoaModel = {
      id: Number(this.pessoa.value.id ?? 0),
      nome: this.pessoa.value.nome ?? '',
      idade: Number(this.pessoa.value.idade ?? 0),
      cidade: this.pessoa.value.cidade ?? ''
    };

    console.log('Enviando atualização:', pessoaAtualizada);

    this.service.atualiza(pessoaAtualizada).subscribe((pessoaModificada) => {
      console.log('Pessoa modificada recebida do backend:', pessoaModificada);
      const indice = this.vetor.findIndex(p => Number(p.id) === Number(pessoaModificada.id));
      if (indice >= 0) this.vetor[indice] = pessoaModificada;
      this.vetor = [...this.vetor];
      console.table(this.vetor);
      this.pessoa.reset();
      this.cancelar();
    });
  }

  remover(): void {
    const id = Number(this.pessoa.value.id ?? 0);
    if (!id) {
      console.log('Nenhum ID válido para remover');
      return;
    }

    console.log('Removendo pessoa com id:', id);

    this.service.remove(id).subscribe(() => {
      console.log('Pessoa removida com sucesso. ID:', id);
      this.vetor = this.vetor.filter(p => Number(p.id) !== id);
      console.table(this.vetor);
      this.cancelar();
    });
  }
}
