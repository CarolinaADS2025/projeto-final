import { Injectable } from '@angular/core';
import { Pessoa } from '../modelo/Pessoa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaServico {
  
   private apiUrl  = 'http://localhost:3000/pessoas';;

  //construtor
  constructor(private http:HttpClient){}

  //Metodo para cadastra Pessoa
  cadastrar(pessoa: Pessoa): Observable<Pessoa>{
    return this.http.post<Pessoa>(this.apiUrl, JSON.stringify(pessoa));
  }

  //Metodo para listar todas as pessoas
  listarTodos():Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  // Selecionar pessoa por id
selecionarPessoa(id:string):Observable<Pessoa>{
    //return this.http.get<Pessoa>(this.url + id);
    return this.http.get<Pessoa>(`${this.apiUrl} ${id}`);
}

// Alterar pessoas
alterar(pessoa:Pessoa):Observable<Pessoa>{
    return this.http.put<Pessoa>(this.apiUrl+pessoa.id, JSON.stringify(pessoa));
}

// Remover pessoas
remover(id:string):Observable<Pessoa>{
    return this.http.delete<Pessoa>(this.apiUrl+id);
}
  
}
