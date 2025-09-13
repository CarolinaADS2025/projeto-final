import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Pessoa } from '../modelo/Pessoa';
import { PessoaServico } from '../servico/pessoa-servico';

@Component({
  selector: 'app-projeto-crud',
  standalone: true, // necessário para usar imports aqui em Angular 15+
  imports: [ReactiveFormsModule], // importa o módulo de formulários reativos
  templateUrl: './projeto-crud.html', // template (HTML)
  styleUrls: ['./projeto-crud.css'] // estilos (CSS)
})
export class ProjetoCrud {

  // Variável que controla a visibilidade dos botões
  // true → mostra "Cadastrar"
  // false → mostra "Alterar/Remover/Cancelar"
  btnCadastrar: boolean = true;

  // Colunas da tabela
  colunas: String[] = ['id', 'nome', 'idade', 'cidade', 'selecionar'];

  // Vetor para armazenar as pessoas carregadas do backend
  vetor: Pessoa[] = [];

  // Objeto de formulário reativo com os campos
  formularioPessoa = new FormGroup({
    id: new FormControl(''),      // campo opcional (para alterar/remover)
    nome: new FormControl(''),
    idade: new FormControl(''),
    cidade: new FormControl('')
  });

  // Construtor injeta o serviço responsável pela comunicação com a API
  constructor(private servico: PessoaServico) {}

  // Ciclo de vida chamado quando o componente é iniciado
  ngOnInit(): void {
    this.listar();
  }

  // Método para cadastrar uma nova pessoa
  cadastrar(): void {
    let obj = { ...this.formularioPessoa.value }; // copia os valores do formulário

    // Chama o serviço → POST
    this.servico.cadastrar(obj as Pessoa).subscribe(pessoa => {
      // adiciona a pessoa no vetor (sem perder os já existentes)
      this.vetor = [...this.vetor, pessoa];

      // limpa o formulário
      this.formularioPessoa.reset();
    });
  }

  // Método para listar todas as pessoas
  listar(): void {
    this.servico.listarTodos().subscribe(pessoas => this.vetor = pessoas);
  }

  // Método para selecionar uma pessoa (quando clica no botão "Selecionar")
  selecionarPessoa(id: string): void {
    this.servico.selecionarPessoa(id).subscribe(pessoa => {
      // Preenche o formulário com os dados recebidos da API
      this.formularioPessoa.patchValue(pessoa);

      // Troca os botões → agora mostra Alterar/Remover
      this.btnCadastrar = false;
    });
  }

  // Método para cancelar a edição/remoção
  cancelar(): void {
    this.formularioPessoa.reset(); // limpa o formulário
    this.btnCadastrar = true;      // volta para o modo "Cadastrar"
  }

  // Método para alterar dados de uma pessoa
  alterar(): void {
    this.servico.alterar(this.formularioPessoa.value as Pessoa)
      .subscribe(pessoa => {
        // encontra o índice da pessoa alterada no vetor
        const indice = this.vetor.findIndex(obj => obj.id === pessoa.id);

        // substitui os dados no vetor
        this.vetor[indice] = pessoa;

        // força atualização (Angular precisa de um novo array)
        this.vetor = [...this.vetor];

        // limpa formulário e volta pro modo "Cadastrar"
        this.cancelar();
      });
  }

  // Método para remover pessoa
  remover(): void {
    const id = this.formularioPessoa.value.id as string; // pega o id do form
    this.servico.remover(id).subscribe(() => {
      // remove do vetor
      this.vetor = this.vetor.filter(obj => obj.id !== id);

      // limpa e volta pro modo "Cadastrar"
      this.cancelar();
    });
  }
}
