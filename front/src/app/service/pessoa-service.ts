import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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
    console.log('[SERVICE] Enviando pessoa para cadastro:', pessoa);
    return this.http.post<PessoaModel>(this.apiUrl, pessoa).pipe(
      tap(res => console.log('[SERVICE] Pessoa cadastrada (resposta):', res))
    );
  }

  // ---------------------------
  // READ - listar todas as pessoas
  // ---------------------------
  listarTodos(): Observable<PessoaModel[]> {
    console.log('[SERVICE] Buscando todas as pessoas...');
    return this.http.get<PessoaModel[]>(this.apiUrl).pipe(
      tap(res => console.log('[SERVICE] Pessoas recebidas:', res))
    );
  }

  // ---------------------------
  // READ - buscar pessoa por ID
  // ---------------------------
  buscarPorId(id: number): Observable<PessoaModel> {
    console.log(`[SERVICE] Buscando pessoa com ID: ${id}`);
    return this.http.get<PessoaModel>(`${this.apiUrl}/${id}`).pipe(
      tap(res => console.log('[SERVICE] Pessoa recebida:', res))
    );
  }

  // ---------------------------
  // UPDATE - atualizar pessoa existente
  // ---------------------------
  atualiza(pessoa: PessoaModel): Observable<PessoaModel> {
    console.log('[SERVICE] Enviando pessoa para atualização:', pessoa);
    return this.http.put<PessoaModel>(`${this.apiUrl}/${pessoa.id}`, pessoa).pipe(
      tap(res => console.log('[SERVICE] Pessoa atualizada (resposta):', res))
    );
  }

  // ---------------------------
  // DELETE - remover pessoa
  // ---------------------------
  remove(id: number): Observable<void> {
    console.log(`[SERVICE] Removendo pessoa com ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('[SERVICE] Pessoa removida com sucesso!'))
    );
  }
}
