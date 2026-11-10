import type { Livro, NovoLivro } from "../types/livro";

// A URL vem do arquivo .env.local (veja .env.example).
// import.meta.env só expõe variáveis que começam com VITE_.
const BASE = (import.meta.env.VITE_CRUDCRUD_URL ?? "").replace(/\/$/, "");
const URL_LIVROS = `${BASE}/livros`;

export const apiConfigurada = BASE !== "" && !BASE.includes("COLE_SEU_CODIGO");

// Função auxiliar: faz o fetch e lança um erro se o status não for 2xx
async function requisicao<T>(url: string, opcoes?: RequestInit): Promise<T> {
  const resposta = await fetch(url, {
    ...opcoes,
    headers: { "Content-Type": "application/json", ...opcoes?.headers },
  });

  if (!resposta.ok) {
    throw new Error(`A API respondeu com erro ${resposta.status}`);
  }

  // DELETE e PUT do crudcrud respondem sem corpo
  const texto = await resposta.text();
  return (texto ? JSON.parse(texto) : undefined) as T;
}

// GET: lista todos os livros
export function listarLivros(): Promise<Livro[]> {
  return requisicao<Livro[]>(URL_LIVROS);
}

// POST: cria um livro e devolve o livro com o _id gerado
export function criarLivro(livro: NovoLivro): Promise<Livro> {
  return requisicao<Livro>(URL_LIVROS, { method: "POST", body: JSON.stringify(livro) });
}

// DELETE: remove pelo _id
export function removerLivro(id: string): Promise<void> {
  return requisicao<void>(`${URL_LIVROS}/${id}`, { method: "DELETE" });
}

// PUT (opcional no enunciado): o crudcrud exige o objeto SEM o _id no corpo
export function atualizarLivro({ _id, ...dados }: Livro): Promise<void> {
  return requisicao<void>(`${URL_LIVROS}/${_id}`, { method: "PUT", body: JSON.stringify(dados) });
}
