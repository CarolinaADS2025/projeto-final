export class Pessoa{
    cadastrar(obj: { nome?: string | undefined; idade?: string | undefined; cidade?: string | undefined; }) {
      throw new Error('Method not implemented.');
    }
    listarTodos() {
      throw new Error('Method not implemented.');
    }
    nome?:string;
    idade?:number;
    cidade?:string;
}