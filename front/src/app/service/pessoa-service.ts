import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PessoaModel } from '../model/PessoaModel';

@Injectable({
  providedIn: 'root' // Serviço disponível em toda a aplicação
})
export class PessoaService {

  // URL base da API
  private apiUrl = 'http://localhost:3000/pessoas'; // ajuste conforme sua API

  constructor(private http: HttpClient) {}

  // ---------------------------
  // CREATE - cadastrar nova pessoa
  // ---------------------------
  cadastra(pessoa: PessoaModel): Observable<PessoaModel> {
    // POST envia os dados da pessoa para a API e retorna a pessoa cadastrada
    return this.http.post<PessoaModel>(this.apiUrl, pessoa);
  }

  // ---------------------------
  // READ - listar todas as pessoas
  // ---------------------------
  listarTodos(): Observable<PessoaModel[]> {
    // GET retorna um array de pessoas
    return this.http.get<PessoaModel[]>(this.apiUrl);
  }

  // ---------------------------
  // READ - buscar pessoa por ID
  // ---------------------------
  buscarPorId(id: number): Observable<PessoaModel> {
    // GET usando ID na URL para buscar pessoa específica
    return this.http.get<PessoaModel>(`${this.apiUrl}/${id}`);
  }

  // ---------------------------
  // UPDATE - atualizar pessoa existente
  // ---------------------------
  atualiza(pessoa: PessoaModel): Observable<PessoaModel> {
    // PUT envia os dados da pessoa para atualizar no backend
    // É necessário que o objeto pessoa tenha o campo 'id'
    return this.http.put<PessoaModel>(`${this.apiUrl}/${pessoa.id}`, pessoa);
  }

  // ---------------------------
  // DELETE - remover pessoa
  // ---------------------------
  remove(id: number): Observable<void> {
    // DELETE remove a pessoa pelo ID
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
